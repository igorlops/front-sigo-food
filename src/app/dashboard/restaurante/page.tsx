'use client';

import { useEffect, useState } from 'react';
import { Typography, Box, Paper, Grid, Skeleton } from '@mui/material';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import RestauranteForm from '@/app/ui/components/Modules/Restaurante/Form/Restaurante';
import { buscaMeuRestaurante } from '@/app/data/service/RestauranteService';
import { Restaurant } from '../../../../../api-types';
import { Storefront, Info } from '@mui/icons-material';

export default function RestaurantePage() {
  const [loading, setLoading] = useState(true);
  const [restaurante, setRestaurante] = useState<Restaurant | null>(null);

  const fetchRestaurante = async () => {
    try {
      const response = await buscaMeuRestaurante();
      if (response && response.data.data) {
        setRestaurante(response.data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar restaurante:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurante();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e3a8a' }}>
        Configurações do Restaurante
      </Typography>
      <Breadcrumb data_breadcrumb={[{ label: 'Configurações', link: '#' }, { label: 'Restaurante', link: 'restaurante' }]} />

      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Storefront color="primary" /> Dados do Estabelecimento
          </Typography>
          
          {loading ? (
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          ) : (
            <RestauranteForm onSuccess={fetchRestaurante} restaurant_id={restaurante?.id || null} />
          )}
        </Paper>
      </Box>
    </Box>
  );
}
