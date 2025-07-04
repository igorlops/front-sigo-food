'use client';

import { useState } from 'react';
import { adicionaCategoria } from '@/app/data/service/CategoriaService';
import { Typography, Box, TextField, Button } from '@mui/material';

interface FormCategoriasProps {
  onSuccess: () => void;
}

export default function FormCategorias({ onSuccess }: FormCategoriasProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await adicionaCategoria(name);
      if (!response?.data.error) {
        setName('');
        onSuccess(); // Atualiza a lista de categorias
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao adicionar a categoria.');
    }
  };

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
