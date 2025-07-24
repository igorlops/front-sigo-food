'use client';

import Categorias from '@/app/ui/components/componentsResults/Categorias';
import FormCategorias from '@/app/ui/components/forms/Categorias';
import { buscaCategorias, Categoria } from '@/app/data/service/CategoriaService';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';

export default function CategoriaPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleClose=()=> {
    setModalVisible(false)
  }

  const fetchCategorias = async () => {
    try {
      const response = await buscaCategorias();
      if (response?.data) {
        setCategorias(response.data.data.data);
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
      <div>
          <ButtonCreateNew description="Criar nova categoria" handleViewForm={() => setModalVisible(!modalVisible)}/>
      </div>
      <Categorias categorias={categorias} error={error} />
      {/* <FormCategorias onSuccess={fetchCategorias} /> */}
      <ModalComponent
        content={<FormCategorias onSuccess={fetchCategorias}/>}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
