'use client';

import Clientes from '@/app/ui/components/componentsResults/Clientes';
import FormClientes from '@/app/ui/components/forms/Clientes';
import { Typography } from '@mui/material';

export default function ClientesPage() {
  return (
    <div>
      <Clientes/>
      <FormClientes/>
    </div>
  );
}
