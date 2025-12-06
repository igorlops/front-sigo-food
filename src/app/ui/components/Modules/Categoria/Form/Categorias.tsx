'use client';

import { useEffect, useState } from 'react';
import { adicionaCategoria, atualizaCategoria, buscaCategoria } from '@/app/data/service/CategoriaService';
import { Typography, Box, TextField, Button } from '@mui/material';
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
      className='px-10 py-10 rounded-xl flex flex-col gap-6 items-center min-w-[400px] bg-gray-100'
    >
      <Typography variant="h5" className="text-blue-900 font-bold">
        {categoria_id ? 'Editar Categoria' : 'Adicionar Categoria'}
      </Typography>

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <TextField
        className="w-full"
        label="Nome da categoria"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Button type="submit" variant="contained" color="primary" className="w-full">
        {categoria_id ? 'Atualizar' : 'Adicionar'}
      </Button>
    </Box>
  );
}

