'use client';

import Categorias from '@/app/ui/components/Modules/Categoria/Table/Categorias';
import FormCategorias from '@/app/ui/components/Modules/Categoria/Form/Categorias';
import { useCategoriasPaginadas } from '@/app/data/hooks/useCategorias';
import { deletaCategoria } from '@/app/data/service/CategoriaService';
import { useState } from 'react';
import { Alert, Collapse, IconButton, Typography } from '@mui/material';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close } from '@mui/icons-material';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';

export default function CategoriaPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [categoria_id, setCategoriaId] = useState<number | null>(null);
  const [message_deletado, setMensagemDeletado] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshKey, setRefreshKey] = useState(0);

  // Usando o hook customizado
  const { data: categorias, loading, error } = useCategoriasPaginadas(currentPage);

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleEditar = (categoria_id: number) => {
    if (confirm("Você deseja editar a categoria?")) {
      setCategoriaId(categoria_id);
      setModalVisible(true);
    }
  };

  const handleExcluir = async (categoria_id: number) => {
    if (confirm("Você deseja excluir a categoria?")) {
      try {
        const response = await deletaCategoria(categoria_id);
        setMensagemDeletado(response.message);
        setOpenAlert(true);
        setRefreshKey(prev => prev + 1); // Force refresh
      } catch (e) {
        console.error("Erro ao deletar categoria");
        setMensagemDeletado("Erro ao deletar categoria");
        setOpenAlert(true);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
    setModalVisible(false);
  };

  return (
    <div>
      <Typography component="h1" variant="h4" className='text-center'>
        Categorias
      </Typography>
      <Breadcrumb data_breadcrumb={[{ label: 'Categoria', link: 'categorias' }]} />
      <Collapse in={openAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message_deletado}
        </Alert>
      </Collapse>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
      <div>
        <ButtonCreateNew description="Criar nova categoria" handleViewForm={() => { setModalVisible(!modalVisible); setCategoriaId(null) }} />
      </div>
      <Categorias categorias={categorias} loading={loading} handleEditar={handleEditar} handleExcluir={handleExcluir} handlePageChange={handlePageChange} />
      <ModalComponent
        content={<FormCategorias onSuccess={handleSuccess} categoria_id={categoria_id} />}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
