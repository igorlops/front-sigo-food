'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (token) {
            // Sucesso: Salvar token e redirecionar
            console.log('Login Google com sucesso. Token recebido.');

            // Aqui você deve moldar o objeto de usuário conforme sua app espera
            // Como o Socialite retorna só o token, talvez precisemos fazer um fetch
            // para /api/user ou o backend mandar os dados via query params também (base64).
            // Por enquanto, salvamos o token.

            // Exemplo simples: Salvar token. Idealmente persistir sessão completa.
            // localStorage.setItem('auth_token', token);

            // Se o backend enviar user info codificada, melhor. 
            // Caso contrário, redirecionamos para uma rota que busca o perfil.

            // Simulação para manter compatibilidade com o código atual que usa localStorage 'sigo_user_profile'
            // O ideal é que o backend envie user_name e user_email também na URL ou busquemos agora.
            const userName = searchParams.get('name');
            const userEmail = searchParams.get('email');

            if (userName && userEmail) {
                const userProfile = {
                    name: userName,
                    email: userEmail,
                    // Outros campos se houver
                };
                localStorage.setItem('sigo_user_profile', JSON.stringify(userProfile));
            }

            // Redirecionar para a home do restaurante ou perfil
            // Tenta pegar o tenant do localStorage ou padrão
            const lastPath = localStorage.getItem('last_path') || '/perfil';
            router.push(lastPath);

        } else if (error) {
            // Erro retornado pelo backend
            console.error('Erro no login Google:', error);
            router.push('/perfil/login?error=google_auth_failed');
        } else {
            // Sem params, algo errado
            console.warn('Callback chamado sem token.');
            // router.push('/perfil/login'); 
        }
    }, [router, searchParams]);

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
            }}
        >
            <CircularProgress />
            <Typography>Autenticando com Google...</Typography>
        </Box>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<Box sx={{ p: 4, textAlign: 'center' }}>Carregando...</Box>}>
            <CallbackContent />
        </Suspense>
    );
}
