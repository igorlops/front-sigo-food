'use client';

import Categorias from '@/app/ui/components/Modules/Categoria/Table/Categorias';
import FormCategorias from '@/app/ui/components/Modules/Categoria/Form/Categorias';
import { buscaCategorias, buscaCategoriasPaginadas, CategoriasPaginadas, deletaCategoria } from '@/app/data/service/CategoriaService';
import { useEffect, useState } from 'react';
import { Alert, Collapse, IconButton, Typography } from '@mui/material';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close } from '@mui/icons-material';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';

export default function CategoriaPage() {
  const [categorias, setCategorias] = useState<CategoriasPaginadas | null>(null);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [categoria_id, setCategoriaId] = useState<number | null>(null)
  const [deletar_categoria_id, setDeletarCategoriaId] = useState<number | null>(null)
  const [message_deletado, setMensagemDeletado] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleClose=()=> {
    setModalVisible(false)
  }
  const handleEditar = (categoria_id:number) => {
    if(confirm("Você deseja editar o produto?")) {
      setCategoriaId(categoria_id)
      setModalVisible(true);
    }
  }
  const handleExcluir = (categoria_id:number) => {
    if(confirm("Você deseja excluir o produto?")) {
      setDeletarCategoriaId(categoria_id)
      setOpenAlert(true)
    }
  }
  const handlePageChange = (page:number) => {
    setCurrentPage(page)
  }

  const fetchCategorias = async () => {
    try {
      setLoading(true)
      const response = await buscaCategoriasPaginadas(currentPage);
      if (response?.data) {
        setCategorias(response.data.data);
      }
      setLoading(false)
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      setError(true);
    }
  };

  const fetchDeletarProduto = async (categoria_id:number) => {
    try {
      setLoading(true)
      const response = await deletaCategoria(categoria_id);
      if(response && response?.data.data)  {
        setMensagemDeletado(response.data.message);
      }
      setLoading(false)
    } catch(e) {
      console.error("Erro ao deletar produto");
      setError(true);
    }
  }

  useEffect(() => { 
    if(deletar_categoria_id != null) {
      fetchDeletarProduto(deletar_categoria_id)
    }
    return () => {
      setDeletarCategoriaId(null)
      setMensagemDeletado(null)
      setOpenAlert(false)
    }
  }, [deletar_categoria_id])

  useEffect(() => {
    fetchCategorias();
  }, [currentPage]); // Atualiza apenas no primeiro carregamento

  return (
    <div>
      <Typography component="h1" variant="h4" className='text-center'>
        Categorias
      </Typography>
      <Breadcrumb data_breadcrumb={[{label:'Categoria', link:'categorias'}]}/>
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
      <p className='text-red-500 text-sm'>{error}</p>
      <div>
          <ButtonCreateNew description="Criar nova categoria" handleViewForm={() => {setModalVisible(!modalVisible); setCategoriaId(null)}}/>
      </div>
      <Categorias categorias={categorias} loading={loading} handleEditar={handleEditar} handleExcluir={handleExcluir} handlePageChange={handlePageChange} />
      {/* <FormCategorias onSuccess={fetchCategorias} /> */}
      <ModalComponent
        content={<FormCategorias onSuccess={fetchCategorias} categoria_id={categoria_id}/>}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
