'use client';

import Pedidos from '@/app/ui/components/Modules/Pedido/Table/Pedido';
import PedidosForm from '@/app/ui/components/Modules/Pedido/Form/Pedido';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close } from '@mui/icons-material';
import { Alert, Collapse, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import { deletaPedido } from '@/app/data/service/PedidoService';
import { usePedidos } from '@/app/data/hooks/usePedidos';

export default function PedidosPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [pedido_id, setPedidoId] = useState<number | null>(null);
  const [message_deletado, setMensagemDeletado] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshKey, setRefreshKey] = useState(0);

  // Usando o hook customizado
  const { data: pedidos, loading, error } = usePedidos(currentPage);

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleEditar = (product_id: number) => {
    if (confirm("Você deseja editar o pedido?")) {
      setPedidoId(product_id);
      setModalVisible(true);
    }
  };

  const handleExcluir = async (product_id: number) => {
    if (confirm("Você deseja excluir o pedido?")) {
      try {
        const response = await deletaPedido(product_id);
        setMensagemDeletado(response.message);
        setOpenAlert(true);
        setRefreshKey(prev => prev + 1); // Force refresh
      } catch (e) {
        console.error("Erro ao deletar pedido");
        setMensagemDeletado("Erro ao deletar pedido");
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
        Pedidos
      </Typography>
      <Breadcrumb data_breadcrumb={[{ label: 'Pedidos', link: 'Pedidos' }]} />
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
        <ButtonCreateNew description="Criar Novo Pedido" handleViewForm={() => { setModalVisible(!modalVisible); setPedidoId(null) }} />
      </div>
      <Pedidos pedidos={pedidos} loading={loading} handleEditar={handleEditar} handleExcluir={handleExcluir} handlePageChange={handlePageChange} />
      <ModalComponent
        content={<PedidosForm onSuccess={handleSuccess} pedido_id={pedido_id} />}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
