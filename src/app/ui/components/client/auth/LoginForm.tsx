'use client';

import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    Divider,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Google as GoogleIcon,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulação de Login
        setTimeout(() => {
            if (email && password) {
                const mockUser = {
                    name: 'Cliente Sigo',
                    email: email,
                    phone: '',
                    address: ''
                };
                localStorage.setItem('sigo_user_profile', JSON.stringify(mockUser));

                // Verificar pedido pendente
                const pendingOrder = localStorage.getItem('sigo_cart_backup');
                if (pendingOrder) {
                    console.log("Pedido pendente encontrado");
                }

                router.push(`/perfil/edit`);
            } else {
                setError('Preencha e-mail e senha.');
                setIsLoading(false);
            }
        }, 1000);
    };

    const handleGoogleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            const googleUser = {
                name: 'Usuário Google',
                email: 'google@gmail.com',
                phone: '',
                address: ''
            };
            localStorage.setItem('sigo_user_profile', JSON.stringify(googleUser));
            router.push(`/perfil/edit`);
        }, 1500);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 450,
                width: '100%',
                mx: 'auto',
                borderRadius: 4,
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    // Usando cores do tema se possível, ou fallback para azul padrão
                    bgcolor: 'primary.main',
                    p: 4,
                    textAlign: 'center',
                    color: 'primary.contrastText'
                }}
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Bem-vindo de volta!
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Faça login para acompanhar seus pedidos
                </Typography>
            </Box>

            <Box sx={{ p: 4 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    sx={{
                        py: 1.5,
                        mb: 3,
                        borderRadius: 2,
                        textTransform: 'none',
                        color: 'text.primary',
                        borderColor: 'divider',
                        '&:hover': {
                            borderColor: 'grey.400',
                            backgroundColor: 'grey.50'
                        }
                    }}
                >
                    Entrar com Google
                </Button>

                <Divider sx={{ mb: 3 }}>
                    <Typography variant="caption" color="text.secondary">
                        ou continue com e-mail
                    </Typography>
                </Divider>

                <form onSubmit={handleLogin}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField
                            label="E-mail"
                            type="email"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />

                        <TextField
                            label="Senha"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isLoading}
                            size="large"
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                mt: 1
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
                        </Button>
                    </Box>
                </form>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Não tem uma conta?{' '}
                        <Link
                            href={`/perfil/create`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                component="span"
                                color="primary"
                                fontWeight={600}
                                sx={{ '&:hover': { textDecoration: 'underline' } }}
                            >
                                Crie agora
                            </Typography>
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}
