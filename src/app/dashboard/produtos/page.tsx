'use client';

import { deletaProduto } from '@/app/data/service/ProdutoService';
import { useProdutos } from '@/app/data/hooks/useProdutos';
import Produtos from '@/app/ui/components/Modules/Produto/Table/Produto';
import ProdutosForm from '@/app/ui/components/Modules/Produto/Form/Produto';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close } from '@mui/icons-material';
import { Alert, Collapse, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';

export default function ProdutosPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [produto_id, setProdutoId] = useState<number | null>(null);
  const [message_deletado, setMensagemDeletado] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshKey, setRefreshKey] = useState(0);

  // Usando o hook customizado
  const { data: produtos, loading, error } = useProdutos(currentPage);

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleEditar = (product_id: number) => {
    if (confirm("Você deseja editar o produto?")) {
      setProdutoId(product_id);
      setModalVisible(true);
    }
  };

  const handleExcluir = async (product_id: number) => {
    if (confirm("Você deseja excluir o produto?")) {
      try {
        const response = await deletaProduto(product_id);
        setMensagemDeletado(response.message);
        setOpenAlert(true);
        setRefreshKey(prev => prev + 1); // Force refresh
      } catch (e) {
        console.error("Erro ao deletar produto");
        setMensagemDeletado("Erro ao deletar produto");
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
      <Typography variant='h2'>
        Produtos
      </Typography>
      <Breadcrumb data_breadcrumb={[{ label: 'Produtos', link: 'produtos' }]} />
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
        <ButtonCreateNew description="Criar Novo produto" handleViewForm={() => { setModalVisible(!modalVisible); setProdutoId(null) }} />
      </div>
      <Produtos produtos={produtos} loading={loading} handleEditar={handleEditar} handleExcluir={handleExcluir} handlePageChange={handlePageChange} />
      <ModalComponent
        content={<ProdutosForm onSuccess={handleSuccess} produto_id={produto_id} />}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
