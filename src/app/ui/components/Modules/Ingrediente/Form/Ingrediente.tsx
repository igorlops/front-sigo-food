'use client';

import { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { adicionaIngrediente, atualizaIngrediente, buscaIngrediente } from "@/app/data/service/IngredienteService";
import { UserLocalStorage } from "@/app/data/utils/const/User";

interface FormIngredienteProps {
    onSuccess: () => void;
    ingrediente_id: number | null;
}

const unidades = ['kg', 'g', 'L', 'ml', 'un', 'cx', 'pct'];

export default function IngredienteForm({ onSuccess, ingrediente_id }: FormIngredienteProps) {
    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [unit, setUnit] = useState<string>('kg');
    const [min_quantity, setMinQuantity] = useState<string>('');
    const [observation, setObservation] = useState<string>('');
    const [error, setError] = useState('');

    const userLocalStorage = UserLocalStorage();
    const restaurant_id = userLocalStorage?.restaurant_id;

    useEffect(() => {
        if (ingrediente_id) {
            fetchIngrediente(ingrediente_id);
        }
    }, [ingrediente_id]);

    const fetchIngrediente = async (id: number) => {
        try {
            const response = await buscaIngrediente(id);
            if (response?.data.data && response.data.data.length > 0) {
                const ingrediente = response.data.data[0];
                setName(ingrediente.name);
                setQuantity(ingrediente.quantity);
                setUnit(ingrediente.unit);
                setMinQuantity(ingrediente.min_quantity || '');
                setObservation(ingrediente.observation || '');
            }
        } catch (err) {
            console.error('Erro ao buscar ingrediente:', err);
            setError('Erro ao buscar ingrediente');
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
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('unit', unit);
        formData.append('restaurant_id', String(restaurant_id));

        if (min_quantity) {
            formData.append('min_quantity', min_quantity);
        }
        if (observation) {
            formData.append('observation', observation);
        }

        try {
            const response = ingrediente_id
                ? await atualizaIngrediente(ingrediente_id, formData)
                : await adicionaIngrediente(formData);

            if (!response?.data.error) {
                setName('');
                setQuantity('');
                setUnit('kg');
                setMinQuantity('');
                setObservation('');
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao salvar ingrediente.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="px-10 py-10 rounded-xl flex flex-col gap-6 items-center min-w-[400px] bg-gray-100"
        >
            <Typography variant="h5" className="text-blue-900 font-bold">
                {ingrediente_id ? 'Editar Ingrediente' : 'Adicionar Ingrediente'}
            </Typography>

            {error && (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            )}

            <TextField
                className="w-full"
                label="Nome do Ingrediente"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <Box className="flex gap-4 w-full">
                <TextField
                    className="flex-1"
                    label="Quantidade"
                    variant="outlined"
                    type="number"
                    inputProps={{ step: "0.01", min: "0" }}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />

                <FormControl className="flex-1">
                    <InputLabel id="unit-label">Unidade</InputLabel>
                    <Select
                        labelId="unit-label"
                        value={unit}
                        label="Unidade"
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        {unidades.map((u) => (
                            <MenuItem key={u} value={u}>
                                {u}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <TextField
                className="w-full"
                label="Quantidade Mínima (opcional)"
                variant="outlined"
                type="number"
                inputProps={{ step: "0.01", min: "0" }}
                value={min_quantity}
                onChange={(e) => setMinQuantity(e.target.value)}
            />

            <TextField
                className="w-full"
                label="Observação (opcional)"
                variant="outlined"
                multiline
                rows={3}
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
            />

            <Button type="submit" variant="contained" color="primary" className="w-full">
                {ingrediente_id ? 'Atualizar' : 'Adicionar'}
            </Button>
        </Box>
    );
}
