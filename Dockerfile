# --- Stage 1: Build da Aplicação Next.js ---
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e yarn.lock (ou package-lock.json) primeiro
# Isso aproveita o cache do Docker.
COPY package.json yarn.lock* ./

# Instala as dependências de produção e desenvolvimento
# Use 'yarn install --frozen-lockfile' para Yarn ou 'npm ci' para npm
RUN yarn install --frozen-lockfile

# Copia o restante dos arquivos da aplicação
COPY . .

# Constrói a aplicação Next.js
# O Next.js cria o diretório .next durante o build
# O comando 'yarn build' (ou 'npm run build') irá transcompilar seu TypeScript
RUN npm run build

# --- Stage 2: Imagem de Produção Final ---
FROM node:20-alpine AS runner

# Define o diretório de trabalho
WORKDIR /app

# Define variáveis de ambiente para produção e porta
# ENV NODE_ENV production
EXPOSE 3000

# Copia apenas o necessário do estágio de build
# Geralmente, o next.config.ts é transpilado para next.config.mjs
# Se você tiver um next.config.js na raiz e não um .mjs, use .js
COPY --from=builder /app/next.config.ts ./ 
#Provável correção para TypeScript
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
# Cuidado: a linha abaixo pode duplicar node_modules. Se você usar `output: 'standalone'`, ela não é necessária.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Se você usa `output: 'standalone'` no seu next.config.js (recomendado para produção com Next.js 12+):
# Descomente as linhas abaixo e COMENTE a linha `COPY --from=builder /app/node_modules ./node_modules` acima.
# Certifique-se que o seu next.config.ts transpila para o formato correto ou que o next.config.mjs gera o standalone.
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# CMD ["node", "server.js"] # Ou o nome do seu arquivo de entrada gerado pelo standalone

# Comando para iniciar a aplicação Next.js em produção
CMD ["yarn", "start"]