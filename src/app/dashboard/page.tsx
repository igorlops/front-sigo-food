'use client';

import { Typography } from '@mui/material';

export default function DashboardPage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Dashboard
      </Typography>
      <Typography variant="body1">
        Aqui você pode ver as informações gerais do seu sistema, acessar produtos, categorias, preços, etc.
      </Typography>
    </div>
  );
}
