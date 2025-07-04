'use client';

import { Estoque } from '@/app/data/service/EstoqueService';
import { Typography, Grid2 } from '@mui/material';

interface EstoquesProps {
  estoques: Estoque[];
  error: boolean;
}

export default function Estoques({ estoques, error }: EstoquesProps) {
  return (
    <>
      <Typography component="h2" variant="h5">
        Componentes de estoques
      </Typography>
      {error ? (
        <Typography component="p" color="error">
          Não foi possível carregar as estoques.
        </Typography>
      ) : (
        <Grid2 container>
          {estoques.map((estoque) => (
            <Grid2 size={{ xs: 2, sm: 4, md: 4 }} key={estoque.id}>
              <Typography component="p" variant="body2">
                {estoque.id_product}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      )}
    </>
  );
}
