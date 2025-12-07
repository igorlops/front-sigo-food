'use client';

import { useEffect, useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { adicionaMetodoPagamento, atualizaMetodoPagamento, buscaMetodoPagamento } from "@/app/data/service/MetodoPagamentoService";

interface FormMetodoPagamentoProps {
    onSuccess: () => void;
    metodo_id: number | null;
}

export default function FormMetodoPagamento({ onSuccess, metodo_id }: FormMetodoPagamentoProps) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (metodo_id) {
            fetchMetodoPagamento(metodo_id);
        }
    }, [metodo_id]);

    const fetchMetodoPagamento = async (id: number) => {
        try {
            const response = await buscaMetodoPagamento(id);
            if (response?.data.data && response.data.data.length > 0) {
                const metodo = response.data.data[0];
                setName(metodo.name);
            }
        } catch (err) {
            console.error('Erro ao buscar método de pagamento:', err);
            setError('Erro ao buscar método de pagamento');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const formData = new FormData();
        formData.append('name', name);

        try {
            const response = metodo_id
                ? await atualizaMetodoPagamento(metodo_id, formData)
                : await adicionaMetodoPagamento(formData);

            if (!response?.data.error) {
                setName("");
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao salvar método de pagamento.');
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
                {metodo_id ? 'Editar Método de Pagamento' : 'Adicionar Método de Pagamento'}
            </Typography>

            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    label="Nome do Método"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    helperText="Ex: Dinheiro, Cartão de Crédito, PIX"
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
                    {metodo_id ? 'Atualizar' : 'Adicionar'}
                </Button>
            </Box>
        </Box>
    );
}
