'use client';

import { useEffect, useState } from 'react';
import { adicionaCategoria, atualizaCategoria, buscaCategoria } from '@/app/data/service/CategoriaService';
import { Typography, Box, TextField, Button, Stack } from '@mui/material';
import { UserLocalStorage } from '@/app/data/utils/const/User';

interface FormCategoriasProps {
  onSuccess: () => void;
  categoria_id: number | null;
}

export default function FormCategorias({ onSuccess, categoria_id }: FormCategoriasProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const userLocalStorage = UserLocalStorage();
  const restaurant_id = userLocalStorage?.restaurant_id;

  useEffect(() => {
    if (categoria_id != null) {
      fetchCategoriaId(categoria_id);
    }
  }, [categoria_id]);

  const fetchCategoriaId = async (categoria_id: number) => {
    try {
      const response = await buscaCategoria(categoria_id);
      if (response?.data.data && response.data.data.length > 0) {
        const categoria = response.data.data[0];
        if (categoria != null) {
          setName(categoria.name);
        }
      }
    } catch (err) {
      console.error('Erro ao buscar categoria:', err);
      setError('Erro ao buscar categoria');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!restaurant_id) {
      setError("Usuário não está logado ou restaurante não encontrado.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('restaurant_id', String(restaurant_id));

    try {
      const response = categoria_id
        ? await atualizaCategoria(categoria_id, formData)
        : await adicionaCategoria(name, restaurant_id);

      if (!response?.data.error) {
        setName('');
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao salvar categoria.');
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
        {categoria_id ? 'Editar Categoria' : 'Adicionar Categoria'}
      </Typography>

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Stack spacing={3}>
        <TextField
          label="Nome da categoria"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          {categoria_id ? 'Atualizar' : 'Adicionar'}
        </Button>
      </Stack>
    </Box>
  );
}

