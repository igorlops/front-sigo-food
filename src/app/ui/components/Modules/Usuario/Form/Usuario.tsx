'use client';

import { useEffect, useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { adicionaUsuario, atualizaUsuario, buscaUsuario } from "@/app/data/service/UsuarioService";
import { UserLocalStorage } from "@/app/data/utils/const/User";

interface FormUsuarioProps {
    onSuccess: () => void;
    usuario_id: number | null;
}

export default function FormUsuario({ onSuccess, usuario_id }: FormUsuarioProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const userLocalStorage = UserLocalStorage();
    const restaurant_id = userLocalStorage?.restaurant_id;

    useEffect(() => {
        if (usuario_id) {
            fetchUsuario(usuario_id);
        }
    }, [usuario_id]);

    const fetchUsuario = async (id: number) => {
        try {
            const response = await buscaUsuario(id);
            if (response?.data.data && response.data.data.length > 0) {
                const usuario = response.data.data[0];
                setName(usuario.name);
                setEmail(usuario.email);
            }
        } catch (err) {
            console.error('Erro ao buscar usuário:', err);
            setError('Erro ao buscar usuário');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!restaurant_id) {
            setError("Usuário não está logado ou restaurante não encontrado.");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('restaurant_id', String(restaurant_id));

        // Senha é obrigatória apenas na criação
        if (!usuario_id && password) {
            formData.append('password', password);
        } else if (!usuario_id && !password) {
            setError("Senha é obrigatória para criar um novo usuário");
            return;
        }

        // Se estiver editando e tiver senha, atualiza a senha
        if (usuario_id && password) {
            formData.append('password', password);
        }

        try {
            const response = usuario_id
                ? await atualizaUsuario(usuario_id, formData)
                : await adicionaUsuario(formData);

            if (!response?.data.error) {
                setName("");
                setEmail("");
                setPassword("");
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao salvar usuário.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 4,
                borderRadius: 3,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                bgcolor: 'white',
                minWidth: 400,
                maxWidth: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                }
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    color: '#1e3a8a',
                    mb: 3
                }}
            >
                {usuario_id ? 'Editar Usuário' : 'Adicionar Usuário'}
            </Typography>

            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    label="Nome completo"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label="E-mail"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label={usuario_id ? "Nova Senha (opcional)" : "Senha"}
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!usuario_id}
                    helperText={usuario_id ? "Deixe em branco para manter a senha atual" : "Mínimo 6 caracteres"}
                    fullWidth
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        bgcolor: '#1e3a8a',
                        '&:hover': { bgcolor: '#0c1e3f' }
                    }}
                    fullWidth
                >
                    {usuario_id ? 'Atualizar' : 'Adicionar'}
                </Button>
            </Box>
        </Box>
    );
}
