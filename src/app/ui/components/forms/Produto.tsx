'use client';

import { useEffect, useState } from "react";
import { adicionaProdutos, buscaProdutos, Produto } from "@/app/data/service/ProdutoService";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, styled, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { buscaCategorias, Categoria } from "@/app/data/service/CategoriaService";

interface FormProdutoProps {
    onSuccess: () => void;
}

export default function ProdutosForm({ onSuccess }: FormProdutoProps) {
    const [name, setName] = useState<string | null>(null);
    const [category_id, setCategoryId] = useState<number | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [price, setPrice] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [image_path, setImagePath] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [categorias, setCategorias] = useState<Categoria[]>([]);

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

    useEffect(() => {
        fetchCategorias();
    },[])
    const handleProduto = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await adicionaProdutos({ name, category_id, description, price, status, image_path });
            if (!response?.data.error) {
                setName('');
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao adicionar a produto.');
        }
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
            onSubmit={handleProduto}
            className="px-10 py-10 rounded-xl flex flex-col gap-6 items-center w-[400px] bg-gray-100"
        >
            <Typography variant="h5" justifyContent={"center"}>Adicionar produto</Typography>
            {error && (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            )}
            <TextField
                className="w-full"
                label="Nome do produto"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Box className="w-full">
                <FormControl fullWidth>
                    <InputLabel id="categorias-label">Categorias</InputLabel>
                    <Select
                    labelId="categorias-label"
                    id="categoria_select"
                    value={category_id}
                    label="Categorias" // <- MESMO TEXTO que o InputLabel
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    >
                    {categorias.map((categoria) => (
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
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <TextField
                className="w-full"
                label="Preço"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <TextField
                className="w-full"
                label="Status"
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            />
            <Button
                className="w-full"
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
            <Typography>
                Imagem do produto
            </Typography>
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) setImagePath(file);
                }}  
            />
            </Button>
                
            <Button type="submit" variant="contained" color="primary" className="w-full">
                Adicionar
            </Button>
        </Box>
    );
}
