'use client';

import { Cliente } from '@/app/data/service/ClienteService';
import { Typography, Grid2 } from '@mui/material';

interface ClientesProps {
  clientes: Cliente[];
  error: boolean;
}

export default function Clientes({ clientes, error }: ClientesProps) {
  return (
    <>
      <Typography component="h2" variant="h5">
        Componentes de Clientes
      </Typography>
      {error ? (
        <Typography component="p" color="error">
          Não foi possível carregar as Clientes.
        </Typography>
      ) : (
        <Grid2 container>
          {clientes.map((cliente) => (
            <Grid2 size={{ xs: 2, sm: 4, md: 4 }} key={cliente.id}>
              <Typography component="p" variant="body2">
                {cliente.first_name}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      )}
    </>
  );
}
