# Guia de Implementação: Autenticação Híbrida (Google + Credenciais)

Para suportar login via Google e login tradicional (E-mail/Senha) de forma unificada, sua API e Banco de Dados precisam seguir algumas diretrizes específicas.

## 1. Estrutura do Banco de Dados

A tabela de usuários (`users` ou `clientes`) precisa ser flexível para aceitar registros que não possuem senha (caso venham do Google) e identificar a origem do cadastro.

### Sugestão de Colunas (Schema)

| Campo | Tipo | Nulável? | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | PK (UUID/Int) | Não | Identificador único |
| `name` | Varchar | Não | Nome do cliente |
| `email` | Varchar | Não | E-mail (Unique Index) |
| `password` | Varchar | **Sim** | Hash da senha (pode ser NULL para contas apenas Google) |
| `google_id` | Varchar | **Sim** | ID único retornado pelo Google (Unique Index) |
| `avatar_url` | Varchar | Sim | Foto de perfil (opcional) |
| `created_at` | Timestamp | Não | Data de criação |

> **Nota:** É crucial que o campo `password` seja *nullable* (aceite nulo), pois usuários que se cadastram via Google não terão senha definida no seu sistema inicialmente.

---

## 2. Fluxo da API (Backend)

Você precisará de 3 endpoints principais no Controller de Autenticação.

### A. Login com E-mail e Senha (`POST /api/auth/login`)
1. Recebe `email` e `password`.
2. Busca usuário pelo `email`.
3. Se o usuário não tem senha definida (é conta Google) ou a senha não bate: retorna erro.
4. Gera e retorna Token (JWT/Sanctum).

### B. Cadastro (`POST /api/auth/register`)
1. Recebe `name`, `email`, `password`.
2. Valida se o e-mail já existe.
   - *Se já existe e tem `google_id`*: Sugere ao usuário fazer login com Google ou permite mesclar contas (avançado).
3. Cria usuário com senha hashada.
4. Retorna Token.

### C. Login com Google (`POST /api/auth/google`)
Este é o fluxo mais crítico para garantir a segurança. O Frontend envia um Token de Acesso ou ID Token fornecido pelo Google, e o Backend valida.

1. **Recebe:** `token` (do provider Google no front).
2. **Validação:** O Backend chama a API do Google (ou usa biblioteca oficial) para validar o `token` e obter os dados do usuário (`email`, `google_id`, `name`).
3. **Lógica de "Upsert" (Encontrar ou Criar):**
   - Busca usuário pelo `email` (prioridade) OU pelo `google_id`.
   - **Cenário 1 (Usuário já existe):**
     - Se encontrou por e-mail mas o `google_id` está vazio: Atualiza o usuário salvando o `google_id` (vincula a conta).
     - Retorna Token de sessão do seu sistema.
   - **Cenário 2 (Novo Usuário):**
     - Cria novo registro na tabela `users`:
       - `name` = Google Name
       - `email` = Google Email
       - `google_id` = Google ID
       - `password` = NULL
     - Retorna Token de sessão.

---

## 3. Fluxo de "Pedido Pendente" (Frontend -> Backend)

Para atender ao requisito "não perder o pedido ao logar":

1. **Frontend:** Antes de redirecionar para o login, salve o carrinho atual no `localStorage` (ex: chave `cart_backup`).
2. **Frontend:** Usuário faz login (Google ou Normal).
3. **Frontend:** Ao receber o sucesso do login (Token), verifica se existe `cart_backup`.
4. **Frontend:** Se existir, envia esses itens para a API de pedidos ou restaura o carrinho na tela.
