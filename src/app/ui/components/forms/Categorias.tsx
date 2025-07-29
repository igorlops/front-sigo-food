'use client';

import { useEffect, useState } from 'react';
import { adicionaCategoria, buscaCategoria } from '@/app/data/service/CategoriaService';
import { Typography, Box, TextField, Button } from '@mui/material';
import { UserLocalStorage} from '@/app/data/utils/const/User';

interface FormCategoriasProps {
  onSuccess: () => void;
  categoria_id: number | null
}

export default function FormCategorias({ onSuccess, categoria_id }: FormCategoriasProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const userLocalStorage = UserLocalStorage();
  if (!userLocalStorage || userLocalStorage.restaurant_id === null) {
    setError("Usuário não está logado ou restaurante não encontrado.");
    return;
  }
  const restaurant_id = userLocalStorage.restaurant_id;

  const handleCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await adicionaCategoria(name, restaurant_id);

      if (!response?.data.error) {
        setName('');
        onSuccess(); // Atualiza a lista de categorias
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao adicionar a categoria.');
    }
  };

  const fetchCategoriaId = async (categoria_id:number) => {
    try {
        const response = await buscaCategoria(categoria_id);
        if (response?.data.data && response.data.data.length > 0) {
            const categoria = response.data.data[0];
            if(categoria != null) {
                setName(categoria.name)
            }
        }
    } catch (err) {
        console.error('Erro ao buscar categoria:', err);
        setError('Erro ao buscar categoria');
    }
  };

  useEffect(() => {
      if(categoria_id != null) {
          fetchCategoriaId(categoria_id);
      }
  },[categoria_id])

  return (
    <Box
      component="form"
      onSubmit={handleCategoria}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
      }}
      className='px-10 py-10 rounded-xl flex flex-col gap-6 items-center w-[400px] bg-gray-100'
    >
      <Typography variant="h5">Adicionar categoria</Typography>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <TextField
        label="Nome da categoria"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Adicionar
      </Button>
    </Box>
  );
}
