'use client';

import Pedidos from '@/app/ui/components/Modules/Pedido/Table/Pedido';
import PedidosForm from '@/app/ui/components/Modules/Pedido/Form/Pedido';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close } from '@mui/icons-material';
import { Alert, Collapse, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import { buscaPedidos, deletaPedido, PedidosPaginados } from '@/app/data/service/PedidoService';

export default function PedidosPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [pedido_id, setPedidoId] = useState<number | null>(null)
  const [deletar_pedido_id, setDeletarPedidoId] = useState<number | null>(null)
  const [message_deletado, setMensagemDeletado] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pedidos, setPedidos] = useState<PedidosPaginados | null>(null);
  const [error, setError] = useState(false);
  
    const handleClose=()=> {
      setModalVisible(false)
    }
  
    const handleEditar = (product_id:number) => {
      if(confirm("Você deseja editar o pedido?")) {
        setPedidoId(product_id)
        setModalVisible(true);
      }
    }
    const handleExcluir = (product_id:number) => {
      if(confirm("Você deseja excluir o pedido?")) {
        setDeletarPedidoId(product_id)
        setOpenAlert(true)
      }
    }
    const handlePageChange = (page:number) => {
      setCurrentPage(page)
    }
  
    const fetchPedidos = async () => {
      try {
        setLoading(true)
        const response = await buscaPedidos(currentPage);
        if (response && response?.data.data) {
          setPedidos(response.data.data);
          setModalVisible(false)
        }
        setLoading(false)
      } catch (err) {
        console.error('Erro ao buscar Pedidos:', err);
        setError(true);
      }
    };

    const fetchDeletarPedido = async (pedido_id:number) => {
      try {
        setLoading(true)
        const response = await deletaPedido(pedido_id);
        if(response && response?.data.data)  {
          setMensagemDeletado(response.data.message);
        }
        setLoading(false)
      } catch(e) {
        console.error("Erro ao deletar Pedido");
        setError(true);
      }
    }
  
    useEffect(() => { 
      if(deletar_pedido_id != null) {
        fetchDeletarPedido(deletar_pedido_id)
      }
      return () => {
        setDeletarPedidoId(null)
        setMensagemDeletado(null)
        setOpenAlert(false)
      }
    }, [deletar_pedido_id])

    useEffect(() => {
      fetchPedidos();
    }, [currentPage]);
  
  return (
    <div>
      <Typography variant='h2'>
        Pedidos
      </Typography>
      <Breadcrumb data_breadcrumb={[{label:'Pedidos', link:'Pedidos'}]}/>
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
          <ButtonCreateNew description="Criar Novo Pedido" handleViewForm={() => {setModalVisible(!modalVisible); setPedidoId(null)}}/>
      </div>
      <Pedidos pedidos={pedidos} loading={loading} handleEditar={handleEditar} handleExcluir={handleExcluir} handlePageChange={handlePageChange}/>
      <ModalComponent
        content={<PedidosForm onSuccess={fetchPedidos} pedido_id={pedido_id}/>}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
