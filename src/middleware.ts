import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl
    const hostname = request.headers.get('host') || ''

    // Remover a porta caso exista (ex: localhost:3000 -> localhost)
    const hostnameNoPort = hostname.split(':')[0]

    // Definição dos domínios base da aplicação (Produção e Desenvolvimento)
    // Se o host for EXATAMENTE um desses, consideramos como acesso ao portal principal (sem tenant)
    const appBaseDomains = [
        'sigofood.com.br',
        'sigofood.local',
        'localhost',
    ]

    // Subdomínios reservados que não devem ser tratados como restaurantes
    const reservedSubdomains = ['www', 'admin', 'painel', 'public']

    // 1. Verificar se é um domínio base (sem subdomínio)
    if (appBaseDomains.includes(hostnameNoPort)) {
        return NextResponse.next()
    }

    // 2. Extrair o subdomínio
    console.log(`[Middleware] Host: ${hostname}, NoPort: ${hostnameNoPort}`);

    let subdomain: string | null = null

    // Tenta encontrar qual domínio base está sendo usado para extrair o prefixo
    // Ex: pizza.sigofood.com.br -> base: sigofood.com.br -> sub: pizza
    const matchedBaseDomain = appBaseDomains.find((domain) =>
        hostnameNoPort.endsWith(`.${domain}`)
    )

    if (matchedBaseDomain) {
        subdomain = hostnameNoPort.replace(`.${matchedBaseDomain}`, '')
    } else {
        // Fallback para casos onde o domínio não corresponde à lista
    }

    // 3. Validações do subdomínio
    if (!subdomain || reservedSubdomains.includes(subdomain) || subdomain === 'sigofood') {
        console.log(`[Middleware] Skipping rewrite. Subdomain: ${subdomain}`);
        return NextResponse.next()
    }

    // 4. Reescrever a URL para o diretório [restaurant]
    // Ex: pizza.sigofood.com.br/menu -> /pizza/menu
    // O Next.js vai mapear /pizza para o diretório app/[restaurant] se configurado dynamic route

    console.log(`[Middleware] Rewriting to: /${subdomain}${url.pathname}`);

    // Clonar a URL atual para manter query params, etc.
    const newUrl = url.clone()

    // Reescreve o pathname para incluir o tenant
    newUrl.pathname = `/${subdomain}${url.pathname}`

    return NextResponse.rewrite(newUrl)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes) -> Opcional: remover se quiser que API também tenha rewrite
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (files with extension like .svg, .png, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
}
