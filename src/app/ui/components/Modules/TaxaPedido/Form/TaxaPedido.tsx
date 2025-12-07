'use client';

import { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { adicionaTaxa, atualizaTaxa, buscaTaxa } from "@/app/data/service/TaxaPedidoService";
import { UserLocalStorage } from "@/app/data/utils/const/User";

interface FormTaxaPedidoProps {
    onSuccess: () => void;
    taxa_id: number | null;
}

const tiposTaxa = [
    { value: 'delivery', label: 'Taxa de Entrega' },
    { value: 'service', label: 'Taxa de Serviço' },
    { value: 'packaging', label: 'Taxa de Embalagem' },
    { value: 'other', label: 'Outra' },
];

export default function TaxaPedidoForm({ onSuccess, taxa_id }: FormTaxaPedidoProps) {
    const [type, setType] = useState<string>('delivery');
    const [desc, setDesc] = useState<string>('');
    const [unit_price, setUnitPrice] = useState<string>('');
    const [error, setError] = useState('');

    const userLocalStorage = UserLocalStorage();
    const restaurant_id = userLocalStorage?.restaurant_id;

    useEffect(() => {
        if (taxa_id) {
            fetchTaxa(taxa_id);
        }
    }, [taxa_id]);

    const fetchTaxa = async (id: number) => {
        try {
            const response = await buscaTaxa(id);
            if (response?.data.data && response.data.data.length > 0) {
                const taxa = response.data.data[0];
                setType(taxa.type);
                setDesc(taxa.desc);
                setUnitPrice(taxa.unit_price);
            }
        } catch (err) {
            console.error('Erro ao buscar taxa:', err);
            setError('Erro ao buscar taxa');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!restaurant_id) {
            setError('Usuário não está logado ou restaurante não encontrado.');
            return;
        }

        const formData = new FormData();
        formData.append('type', type);
        formData.append('desc', desc);
        formData.append('unit_price', unit_price);
        formData.append('restaurant_id', String(restaurant_id));

        try {
            const response = taxa_id
                ? await atualizaTaxa(taxa_id, formData)
                : await adicionaTaxa(formData);

            if (!response?.data.error) {
                setType('delivery');
                setDesc('');
                setUnitPrice('');
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao salvar taxa.');
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
                {taxa_id ? 'Editar Taxa' : 'Adicionar Taxa'}
            </Typography>

            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="type-label">Tipo de Taxa</InputLabel>
                    <Select
                        labelId="type-label"
                        value={type}
                        label="Tipo de Taxa"
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        {tiposTaxa.map((tipo) => (
                            <MenuItem key={tipo.value} value={tipo.value}>
                                {tipo.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Descrição"
                    variant="outlined"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    helperText="Ex: Taxa de entrega para região central"
                    fullWidth
                />

                <TextField
                    label="Valor (R$)"
                    variant="outlined"
                    type="number"
                    inputProps={{ step: "0.01", min: "0" }}
                    value={unit_price}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    required
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
                    {taxa_id ? 'Atualizar' : 'Adicionar'}
                </Button>
            </Box>
        </Box>
    );
}
