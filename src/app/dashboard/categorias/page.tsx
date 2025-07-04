'use client';

import Categorias from '@/app/ui/components/componentsResults/Categorias';
import FormCategorias from '@/app/ui/components/forms/Categorias';
import { buscaCategorias, Categoria } from '@/app/data/service/CategoriaService';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export default function CategoriaPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [error, setError] = useState(false);

  const fetchCategorias = async () => {
    try {
      const response = await buscaCategorias();
      if (response?.data) {
        setCategorias(response.data.data);
      }
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []); // Atualiza apenas no primeiro carregamento

  return (
    <div>
      <Typography component="h1" variant="h4">
        Página de Categorias
      </Typography>
      <Categorias categorias={categorias} error={error} />
      <FormCategorias onSuccess={fetchCategorias} />
    </div>
  );
}
