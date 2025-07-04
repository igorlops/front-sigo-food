'use client';

import { Categoria } from '@/app/data/service/CategoriaService';
import { Typography, Grid2 } from '@mui/material';

interface CategoriasProps {
  categorias: Categoria[];
  error: boolean;
}

export default function Categorias({ categorias, error }: CategoriasProps) {
  return (
    <>
      <Typography component="h2" variant="h5">
        Componentes de categorias
      </Typography>
      {error ? (
        <Typography component="p" color="error">
          Não foi possível carregar as categorias.
        </Typography>
      ) : (
        <Grid2 container>
          {categorias.map((categoria) => (
            <Grid2 size={{ xs: 2, sm: 4, md: 4 }} key={categoria.id}>
              <Typography component="p" variant="body2">
                {categoria.name}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      )}
    </>
  );
}
