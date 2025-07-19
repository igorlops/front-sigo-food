'use client';

import { useEffect, useState } from "react";
import { adicionaProdutos, atualizaProduto, buscaProduto} from "@/app/data/service/ProdutoService";
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, styled, Switch, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { buscaCategorias, Categoria } from "@/app/data/service/CategoriaService";
import { UserLocalStorage } from "@/app/data/utils/const/User";

interface FormProdutoProps {
    onSuccess: () => void;
    produto_id: number | null
}

export default function ProdutosForm({ onSuccess, produto_id }: FormProdutoProps) {
    const [name, setName] = useState<string | null>(null);
    const [category_id, setCategoryId] = useState<number | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [price, setPrice] = useState<string| null>(null);
    const [status, setStatus] = useState<string | null>(null); // O status inicial é 'Ativo'
    const [image_path, setImagePath] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const userLocalStorage = UserLocalStorage();
    if (!userLocalStorage || userLocalStorage.restaurant_id === null) {
        setError("Usuário não está logado ou restaurante não encontrado.");
        return null; // Retorne null ou um componente de erro para evitar renderização incorreta.
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
            if (response?.data && response.data.data.length > 0) {
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
            console.error('Erro ao buscar categorias:', err);
            setError('Erro ao buscar categorias');
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    useEffect(() => {
        if(produto_id != null) {
            fetchProdutoId(produto_id);
        }
    },[produto_id])

    const handleAdicionaProduto = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await adicionaProdutos({ name, category_id, description, price, status, image_path, restaurant_id });
            if (!response?.data.error) {
                setName('');
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

        if(produto_id) {
            try {
                const response = await atualizaProduto(produto_id, { name, category_id, description, price, status, image_path, restaurant_id });
                if (!response?.data.error) {
                    setName('');
                    onSuccess();
                }
            } catch (error) {
                console.error(error);
                setError('Erro ao adicionar a produto.');
            }
        }
    };

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Atualiza o status baseado no checked do evento
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
            onSubmit={produto_id ? handleEditaProduto : handleAdicionaProduto}
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
                        value={category_id ?? ''}
                        label="Categorias"
                        onChange={(e) => {
                            const value = e.target.value;
                            setCategoryId(value === '' ? null : Number(value));
                        }}
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
            <FormControlLabel
                control={
                    // Remova defaultChecked e confie apenas em 'checked'
                    <Switch checked={status === 'Ativo'} onChange={handleSwitch} name="status" />
                }
                label="Produto está ativo?"
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
                {produto_id ? 'Editar' : 'Adicionar'}
            </Button>
        </Box>
    );
}