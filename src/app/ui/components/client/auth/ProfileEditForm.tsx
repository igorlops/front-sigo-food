'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Divider,
    Grid,
    InputAdornment,
    CircularProgress,
    Fade
} from '@mui/material';
import {
    Logout as LogoutIcon,
    Edit as EditIcon,
    Person as PersonIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Save as SaveIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export default function ProfileEditForm() {
    const router = useRouter();

    const [user, setUser] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('sigo_user_profile');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Erro ao ler perfil", e);
                localStorage.removeItem('sigo_user_profile');
                router.push(`/perfil/login`);
            }
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('sigo_user_profile');
        router.push(`/perfil/login`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (user) {
            setUser(prev => prev ? ({ ...prev, [name]: value }) : null);
        }
    };

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (user) {
                localStorage.setItem('sigo_user_profile', JSON.stringify(user));
            }
            setIsEditing(false);
            setIsLoading(false);
        }, 800);
    };

    if (!user) return (
        <Box p={8} display="flex" justifyContent="center">
            <CircularProgress />
        </Box>
    );

    return (
        <Fade in={true}>
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider'
                }}
            >
                <Box
                    sx={{
                        background: 'linear-gradient(to right, #f8fafc, #ffffff)',
                        borderBottom: 1,
                        borderColor: 'divider',
                        p: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 2
                    }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight="bold" color="text.primary">
                            Meu Perfil
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                            Gerencie suas informações pessoais
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 'medium'
                        }}
                    >
                        Sair
                    </Button>
                </Box>

                <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Dados Pessoais */}
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 6,
                                        height: 24,
                                        bgcolor: 'primary.main',
                                        borderRadius: '10px'
                                    }}
                                    className="bg-blue-600" // Tailwind fallback just in case
                                />
                                <Typography variant="h6" fontWeight="bold" color="text.primary">
                                    Dados Pessoais
                                </Typography>
                            </Box>
                            {!isEditing && (
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={() => setIsEditing(true)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Editar
                                </Button>
                            )}
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Nome Completo"
                                    name="name"
                                    fullWidth
                                    value={user.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color={isEditing ? 'primary' : 'disabled'} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Telefone / WhatsApp"
                                    name="phone"
                                    fullWidth
                                    value={user.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    placeholder="(00) 00000-0000"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon color={isEditing ? 'primary' : 'disabled'} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="E-mail"
                                    name="email"
                                    fullWidth
                                    value={user.email}
                                    onChange={handleChange}
                                    disabled={true}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="disabled" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            bgcolor: 'action.hover'
                                        }
                                    }}
                                    helperText={isEditing ? "Para alterar o e-mail, entre em contato com o suporte." : ""}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider />

                    {/* Endereço */}
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                            <Box
                                sx={{
                                    width: 6,
                                    height: 24,
                                    bgcolor: 'error.main',
                                    borderRadius: '10px'
                                }}
                            />
                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                Endereço de Entrega Principal
                            </Typography>
                        </Box>

                        <TextField
                            label="Endereço Completo"
                            name="address"
                            fullWidth
                            multiline
                            rows={3}
                            value={user.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder="Rua, Número, Bairro, Complemento"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ mt: 1.5 }}>
                                        <LocationIcon color={isEditing ? 'error' : 'disabled'} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                    </Box>

                    {isEditing && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setIsEditing(false)}
                                disabled={isLoading}
                                sx={{
                                    borderRadius: 2,
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 'bold'
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                sx={{
                                    borderRadius: 2,
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    boxShadow: 4
                                }}
                            >
                                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Fade>
    );
}
