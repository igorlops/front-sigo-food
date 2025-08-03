'use client';

import { useEffect, useState } from "react";
import { adicionaProdutos, atualizaProduto, buscaProduto} from "@/app/data/service/ProdutoService";
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, styled, Switch, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { buscaCategorias, Categoria } from "@/app/data/service/CategoriaService";
import { UserLocalStorage } from "@/app/data/utils/const/User";
import Image from "next/image";
// REMOVA: import { URL } from "url";

interface FormPedidoProps {
    onSuccess: () => void;
    pedido_id: number | null
}

export default function PedidosForm({ onSuccess, pedido_id }: FormPedidoProps) {
    const [name, setName] = useState<string | null>('');
    const [category_id, setCategoryId] = useState<number | null>(null);
    const [description, setDescription] = useState<string | null>('');
    const [price, setPrice] = useState<string| null>('');
    const [status, setStatus] = useState<string | null>(''); // O status inicial é 'Ativo'
    const [error, setError] = useState('');
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const userLocalStorage = UserLocalStorage();
    if (!userLocalStorage || userLocalStorage.restaurant_id === null) {
        setError("Usuário não está logado ou restaurante não encontrado.");
        return null; 
    }
    const restaurant_id = userLocalStorage.restaurant_id;

    const fetchCategorias = async () => {
        try {
            const response = await buscaCategorias();
            if (response?.data) {
                setCategorias(response.data.data);
            }
        } catch (err) {
            console.error('Erro ao buscar categorias:', err);
            setError('Erro ao buscar categorias');
        }
    };
    const fetchProdutoId = async (product_id:number) => {
        try {
            const response = await buscaProduto(product_id);
            if (response?.data.data && response.data.data.length > 0) {
                const produto = response.data.data[0];
                if(produto != null) {
                    setCategoryId(produto.category_id)
                    setDescription(produto.description)
                    setPrice(produto.price)
                    setStatus(produto.status)
                    setName(produto.name)
                }
            }
        } catch (err) {
            console.error('Erro ao buscar produto:', err);
            setError('Erro ao buscar produto');


        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    useEffect(() => {
        if(pedido_id != null) {
            fetchProdutoId(pedido_id);
        }
    },[pedido_id])

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
            if (!response?.data.error) {
                setName('');
                setDescription('');
                setPrice('');
                setStatus('');
                setCategoryId(null);
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao adicionar a produto.');
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

        if(pedido_id) {
            try {
                const response = await atualizaProduto(pedido_id, formData);
                if (!response?.data.error) {
                    setName('');
                    setDescription('');
                    setPrice('');
                    setStatus('');
                    setCategoryId(null);
                    onSuccess();
                }
            } catch (error) {
                console.error(error);
                setError('Erro ao adicionar a produto.');
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
                </Box>
            </Box>
            <Button type="submit" variant="contained" color="primary" className="w-full">
                {pedido_id ? 'Editar' : 'Adicionar'}
            </Button>
        </Box>
    );
}