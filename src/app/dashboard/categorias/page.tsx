'use client';

import Categorias from '@/app/ui/components/componentsResults/Categorias';
import FormCategorias from '@/app/ui/components/forms/Categorias';
import { Typography } from '@mui/material';

export default function CategoriaPage() {
  return (
    <div>
      <Categorias/>
      <FormCategorias/>
    </div>
  );
}
