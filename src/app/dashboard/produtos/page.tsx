'use client';

import { buscaProdutos, deletaProduto, ProdutosPaginados } from '@/app/data/service/ProdutoService';
import Produtos from '@/app/ui/components/Modules/Produto/Table/Produto';
import ProdutosForm from '@/app/ui/components/Modules/Produto/Form/Produto';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close } from '@mui/icons-material';
import { Alert, Collapse, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';

export default function ProdutosPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [produto_id, setProdutoId] = useState<number | null>(null)
  const [deletar_produto_id, setDeletarProdutoId] = useState<number | null>(null)
  const [message_deletado, setMensagemDeletado] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [produtos, setProdutos] = useState<ProdutosPaginados | null>(null);
  const [error, setError] = useState(false);
  
    const handleClose=()=> {
      setModalVisible(false)
    }
  
    const handleEditar = (product_id:number) => {
      if(confirm("Você deseja editar o produto?")) {
        setProdutoId(product_id)
        setModalVisible(true);
      }
    }
    const handleExcluir = (product_id:number) => {
      if(confirm("Você deseja excluir o produto?")) {
        setDeletarProdutoId(product_id)
        setOpenAlert(true)
      }
    }
    const handlePageChange = (page:number) => {
      setCurrentPage(page)
    }
  
    const fetchProdutos = async () => {
      try {
        setLoading(true)
        const response = await buscaProdutos(currentPage);
        if (response && response?.data.data) {
          setProdutos(response.data.data);
          setModalVisible(false)
        }
        setLoading(false)
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError(true);
      }
    };

    const fetchDeletarProduto = async (produto_id:number) => {
      try {
        setLoading(true)
        const response = await deletaProduto(produto_id);
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
      if(deletar_produto_id != null) {
        fetchDeletarProduto(deletar_produto_id)
      }
      return () => {
        setDeletarProdutoId(null)
        setMensagemDeletado(null)
        setOpenAlert(false)
      }
    }, [deletar_produto_id])

    useEffect(() => {
      fetchProdutos();
    }, [currentPage]);
  
  return (
    <div>
      <Typography variant='h2'>
        Produtos
      </Typography>
      <Breadcrumb data_breadcrumb={[{label:'Produtos', link:'produtos'}]}/>
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
          <ButtonCreateNew description="Criar Novo produto" handleViewForm={() => {setModalVisible(!modalVisible); setProdutoId(null)}}/>
      </div>
      <Produtos produtos={produtos} loading={loading} handleEditar={handleEditar} handleExcluir={handleExcluir} handlePageChange={handlePageChange}/>
      <ModalComponent
        content={<ProdutosForm onSuccess={fetchProdutos} produto_id={produto_id}/>}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
