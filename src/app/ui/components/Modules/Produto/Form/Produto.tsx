'use client';

import { useEffect, useState } from "react";
import { adicionaProdutos, atualizaProduto, buscaProduto } from "@/app/data/service/ProdutoService";
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, styled, Switch, TextField, Typography, Grid, Card, CardMedia } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { buscaCategorias, Categoria } from "@/app/data/service/CategoriaService";
import { UserLocalStorage } from "@/app/data/utils/const/User";
import Image from "next/image";

interface FormProdutoProps {
    onSuccess: () => void;
    produto_id: number | null
}

export default function ProdutosForm({ onSuccess, produto_id }: FormProdutoProps) {
    const [name, setName] = useState<string | null>('');
    const [category_id, setCategoryId] = useState<number | null>(null);
    const [description, setDescription] = useState<string | null>('');
    const [price, setPrice] = useState<string | null>('');
    const [status, setStatus] = useState<number | null>(null);
    const [image_path, setImagePath] = useState<File | null>(null);
    const [image_preview, setImagePreview] = useState<string | null>(null);
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
    const fetchProdutoId = async (product_id: number) => {
        try {
            const response = await buscaProduto(product_id);
            if (response?.data.data && response.data.data.length > 0) {
                const produto = response.data.data[0];
                if (produto != null) {
                    setCategoryId(produto.category_id)
                    setDescription(produto.description)
                    setPrice(produto.price)
                    setStatus(produto.status.id)
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
        if (produto_id != null) {
            fetchProdutoId(produto_id);
        }
    }, [produto_id])

    useEffect(() => {
        if (image_path) {
            const url = window.URL.createObjectURL(image_path);
            setImagePreview(url);

            return () => {
                window.URL.revokeObjectURL(url);
            };
        }
    }, [image_path])

    const handleAdicionaProduto = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        if (name) formData.append('name', name);
        if (category_id) formData.append('category_id', String(category_id));
        if (description) formData.append('description', description);
        if (price) formData.append('price', price);
        if (status) formData.append('status', String(status));
        if (restaurant_id) formData.append('restaurant_id', String(restaurant_id));

        if (image_path) {
            formData.append('image_path', image_path);
        }

        try {
            const response = await adicionaProdutos(formData);
            if (!response?.data.error) {
                setName('');
                setDescription('');
                setPrice('');
                setStatus(null);
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
        if (status) formData.append('status', String(status));
        if (restaurant_id) formData.append('restaurant_id', String(restaurant_id));

        if (image_path) {
            formData.append('image_path', image_path);
        }
        if (produto_id) {
            try {
                const response = await atualizaProduto(produto_id, formData);
                if (!response?.data.error) {
                    setName('');
                    setDescription('');
                    setPrice('');
                    setStatus(null);
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
        setStatus(event.target.checked ? 1 : 2);
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
            onSubmit={produto_id ? handleEditaProduto : handleAdicionaProduto}
            sx={{
                p: 4,
                borderRadius: 3,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                bgcolor: 'white',
                minWidth: 500,
                maxWidth: 800,
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
                    mb: 3,
                    textAlign: 'center'
                }}
            >
                {produto_id ? 'Editar Produto' : 'Adicionar Produto'}
            </Typography>

            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2, textAlign: 'center' }}>
                    {error}
                </Typography>
            )}

            <Grid container spacing={3}>
                {image_preview && (
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardMedia
                                component="img"
                                image={image_preview}
                                alt="Preview do produto"
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: 250,
                                    objectFit: 'contain'
                                }}
                            />
                        </Card>
                    </Grid>
                )}

                <Grid item xs={12} md={image_preview ? 8 : 12}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Nome do produto"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel id="categorias-label">Categorias</InputLabel>
                            <Select
                                labelId="categorias-label"
                                id="categoria_select"
                                value={category_id ?? ''}
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

                        <TextField
                            label="Descrição"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Preço"
                            variant="outlined"
                            type="number"
                            inputProps={{ step: "0.01", min: "0" }}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            fullWidth
                        />

                        <FormControlLabel
                            control={
                                <Switch checked={status === 1} onChange={handleSwitch} name="status" />
                            }
                            label="Produto está ativo?"
                        />

                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                borderColor: '#1e3a8a',
                                color: '#1e3a8a',
                                '&:hover': {
                                    borderColor: '#0c1e3f',
                                    bgcolor: 'rgba(30, 58, 138, 0.04)'
                                }
                            }}
                            fullWidth
                        >
                            <Typography>
                                {image_path ? image_path.name : 'Imagem do produto'}
                            </Typography>
                            <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    if (file) setImagePath(file);
                                }}
                            />
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Button
                type="submit"
                variant="contained"
                sx={{
                    mt: 3,
                    bgcolor: '#1e3a8a',
                    '&:hover': { bgcolor: '#0c1e3f' }
                }}
                fullWidth
            >
                {produto_id ? 'Atualizar' : 'Adicionar'}
            </Button>
        </Box>
    );
}