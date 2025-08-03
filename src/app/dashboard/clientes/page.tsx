'use client';

import { buscaClientes, Cliente, ClientesPaginados, deletaCliente } from '@/app/data/service/ClienteService';
import Clientes from '@/app/ui/components/Modules/Cliente/Table/Clientes';
import FormClientes from '@/app/ui/components/Modules/Cliente/Form/Clientes';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close } from '@mui/icons-material';
import { Alert, Collapse, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ClientesPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [cliente_id, setClienteId] = useState<number | null>(null)
  const [deletar_cliente_id, setDeletarClienteId] = useState<number | null>(null)
  const [message_deletado, setMensagemDeletado] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [clientes, setClientes] = useState<ClientesPaginados | null>(null); // Agora o estado é um array de Categoria
  const [error, setError] = useState(false);


  const handleClose=()=> {
      setModalVisible(false)
    }
  
    const handleEditar = (client_id:number) => {
      if(confirm("Você deseja editar o cliente?")) {
        setClienteId(client_id)
        setModalVisible(true);
      }
    }
    const handleExcluir = (client_id:number) => {
      if(confirm("Você deseja excluir o cliente?")) {
        setDeletarClienteId(client_id)
        setOpenAlert(true)
      }
    }
    const handlePageChange = (page:number) => {
      setCurrentPage(page)
    }
  const fetchClientes = async () => {
      setLoading(true)
      try {
          const response = await buscaClientes();
          console.log(response?.data)
          if (response?.data) {
              setClientes(response.data.data);
          }
        setLoading(false)
      } catch (err) {
          console.error("Erro ao buscar clientes:", err);
          setError(true);
      }
  }
   const fetchDeletarCliente = async (cliente_id:number) => {
      try {
        setLoading(true)
        const response = await deletaCliente(cliente_id);
        if(response && response?.data.data)  {
          setMensagemDeletado(response.data.message);
        }
        setLoading(false)
      } catch(e) {
        console.error("Erro ao deletar cliente");
        setError(true);
      }
    }
  
    useEffect(() => { 
      if(deletar_cliente_id != null) {
        fetchDeletarCliente(deletar_cliente_id)
      }
      return () => {
        setDeletarClienteId(null)
        setMensagemDeletado(null)
        setOpenAlert(false)
      }
    }, [deletar_cliente_id])
  

  useEffect(() => {
    fetchClientes()
  },[])
  return (
    <div>
      <Typography variant='h2'>
        Clientes
      </Typography>
          <Breadcrumb data_breadcrumb={[{label:'Clientes', link:'clientes'}]}/>
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
          <ButtonCreateNew description="Criar Novo Cliente" handleViewForm={() => {setModalVisible(!modalVisible); setClienteId(null)}}/>
      </div>
      <Clientes clientes={clientes} loading={loading} handleEditar={handleEditar} handleExcluir={handleExcluir} handlePageChange={handlePageChange}/>
      <ModalComponent
        content={<FormClientes onSuccess={fetchClientes} cliente_id={cliente_id}/>}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
