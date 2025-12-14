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
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    Phone as PhoneIcon,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulação de Registro
        setTimeout(() => {
            if (email && password && name) {
                const newUser = {
                    name: name,
                    email: email,
                    phone: phone,
                    address: ''
                };
                localStorage.setItem('sigo_user_profile', JSON.stringify(newUser));
                router.push(`/perfil/edit`);
            } else {
                setError('Preencha todos os campos.');
                setIsLoading(false);
            }
        }, 1000);
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
                    bgcolor: 'primary.main',
                    p: 4,
                    textAlign: 'center',
                    color: 'primary.contrastText'
                }}
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Crie sua conta
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Cadastre-se para fazer pedidos rapidamente
                </Typography>
            </Box>

            <Box sx={{ p: 4 }}>
                <form onSubmit={handleRegister}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField
                            label="Nome Completo"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />

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
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                            label="Telefone"
                            type="text"
                            fullWidth
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Criar Conta'}
                        </Button>
                    </Box>
                </form>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Já tem uma conta?{' '}
                        <Link
                            href={`/perfil/login`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                component="span"
                                color="primary"
                                fontWeight={600}
                                sx={{ '&:hover': { textDecoration: 'underline' } }}
                            >
                                Faça login
                            </Typography>
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}
