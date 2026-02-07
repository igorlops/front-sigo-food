'use client';

import { useEffect, useState } from "react";
import { adicionaProdutos, atualizaProduto } from "@/app/data/service/ProdutoService";
import { useProduto } from "@/app/data/hooks/useProdutos";
import { Autocomplete, Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, styled, Switch, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useCategorias } from "@/app/data/hooks/useCategorias";
import { UserLocalStorage } from "@/app/data/utils/const/User";
import Image from "next/image";

interface FormPedidoProps {
    onSuccess: () => void;
    pedido_id: number | null
}

export default function PedidosForm({ onSuccess, pedido_id }: FormPedidoProps) {
    const [name, setName] = useState<string | null>('');
    const [category_id, setCategoryId] = useState<number | null>(null);
    const [description, setDescription] = useState<string | null>('');
    const [price, setPrice] = useState<string | null>('');
    const [status, setStatus] = useState<string | null>('');
    const [error, setError] = useState('');

    const userLocalStorage = UserLocalStorage();
    const restaurant_id = userLocalStorage?.restaurant_id;

    // Usando hooks customizados
    const { data: categorias } = useCategorias();
    const { data: produto } = useProduto(pedido_id);

    useEffect(() => {
        if (produto) {
            setCategoryId(produto.category_id);
            setDescription(produto.description);
            setPrice(produto.price);
            setStatus(produto.status.description);
            setName(produto.name);
        } else if (pedido_id === null) {
            setName('');
            setCategoryId(null);
            setDescription('');
            setPrice('');
            setStatus('');
        }
    }, [produto, pedido_id]);

    if (!userLocalStorage || userLocalStorage.restaurant_id === null) {
        return (
            <Box className="p-4">
                <Typography color="error">Usuário não está logado ou restaurante não encontrado.</Typography>
            </Box>
        );
    }

    const handleAdicionaProduto = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        if (name) formData.append('name', name);
        if (category_id) formData.append('category_id', String(category_id));
        if (description) formData.append('description', description);
        if (price) formData.append('price', price);
        if (status) formData.append('status', status);
        if (restaurant_id) formData.append('restaurant_id', String(restaurant_id));

        try {
            const response = await adicionaProdutos(formData);
            if (!response.error) {
                setName('');
                setDescription('');
                setPrice('');
                setStatus('');
                setCategoryId(null);
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao adicionar produto.');
        }
    };

    const handleEditaProduto = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const formData = new FormData();
        if (name) formData.append('name', name);
        if (category_id) formData.append('category_id', String(category_id));
        if (description) formData.append('description', description);
        if (price) formData.append('price', price);
        if (status) formData.append('status', status);
        if (restaurant_id) formData.append('restaurant_id', String(restaurant_id));

        if (pedido_id) {
            try {
                const response = await atualizaProduto(pedido_id, formData);
                if (!response.error) {
                    setName('');
                    setDescription('');
                    setPrice('');
                    setStatus('');
                    setCategoryId(null);
                    onSuccess();
                }
            } catch (error) {
                console.error(error);
                setError('Erro ao atualizar produto.');
            }
        }
    };

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.checked ? 'Ativo' : 'Inativo');
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Box
            component="form"
            onSubmit={pedido_id ? handleEditaProduto : handleAdicionaProduto}
            className="px-10 py-10 rounded-xl flex flex-col gap-6 items-center min-w-[400px] bg-gray-100 max-h-[100vh]"
        >

            <Typography variant="h5" justifyContent={"center"}>Adicionar produto</Typography>
            {error && (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            )}
            <Box className="flex flex-row gap-10">

                <Box className='flex flex-col gap-5'>

                    <TextField
                        className="w-full"
                        label="Nome do produto"
                        variant="outlined"
                        value={name}
                        // REMOVA: defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Box className="w-full">
                        <FormControl fullWidth>
                            <InputLabel id="categorias-label">Categorias</InputLabel>
                            <Select
                                labelId="categorias-label"
                                id="categoria_select"
                                value={category_id ?? ''}
                                // REMOVA: defaultValue={category_id ?? null}
                                label="Categorias"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setCategoryId(value === '' ? null : Number(value));
                                }}
                            >
                                {categorias?.map((categoria) => (
                                    <MenuItem key={categoria.id} value={categoria.id}>
                                        {categoria.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <TextField
                        className="w-full"
                        label="Descrição"
                        variant="outlined"
                        value={description}
                        // REMOVA: defaultValue={description ?? ''}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <TextField
                        className="w-full"
                        label="Preço"
                        variant="outlined"
                        value={price}
                        // REMOVA: defaultValue={price ?? ''}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <FormControlLabel
                        control={
                            // Remova defaultChecked e confie apenas em 'checked'
                            <Switch checked={status === 'Ativo'} onChange={handleSwitch} name="status" />
                        }
                        label="Produto está ativo?"
                    />
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags"
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                        renderInput={(params) => (
                            <TextField {...params} label="limitTags" placeholder="Favorites" />
                        )}
                        sx={{ width: '500px' }}
                    />
                </Box>
            </Box>
            <Button type="submit" variant="contained" color="primary" className="w-full">
                {pedido_id ? 'Editar' : 'Adicionar'}
            </Button>
        </Box>
    );
}