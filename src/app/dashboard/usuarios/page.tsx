'use client';

import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close } from '@mui/icons-material';
import { Alert, Collapse, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import Usuarios from '@/app/ui/components/Modules/Usuario/Table/Usuario';
import FormUsuario from '@/app/ui/components/Modules/Usuario/Form/Usuario';
import { buscaUsuarios, deletaUsuario, UsuariosPaginados } from '@/app/data/service';

export default function UsuariosPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [usuario_id, setUsuarioId] = useState<number | null>(null)
  const [deletar_usuario_id, setDeletarUsuarioId] = useState<number | null>(null)
  const [message_deletado, setMensagemDeletado] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [usuarios, setUsuarios] = useState<UsuariosPaginados | null>(null);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setModalVisible(false)
  }

  const handleEditar = (usuario_id: number) => {
    if (confirm("Você deseja editar o usuario?")) {
      setUsuarioId(usuario_id)
      setModalVisible(true);
    }
  }
  const handleExcluir = (usuario_id: number) => {
    if (confirm("Você deseja excluir o usuario?")) {
      setDeletarUsuarioId(usuario_id)
      setOpenAlert(true)
    }
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const fetchUsuarios = async () => {
    try {
      setLoading(true)
      const response = await buscaUsuarios(currentPage);
      if (response && response?.data.data) {
        setUsuarios(response.data.data);
        setModalVisible(false)
      }
      setLoading(false)
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      setError(true);
    }
  };

  const fetchDeletarUsuario = async (usuario_id: number) => {
    try {
      setLoading(true)
      const response = await deletaUsuario(usuario_id);
      if (response && response?.data.data) {
        setMensagemDeletado(response.data.message);
      }
      setLoading(false)
    } catch (e) {
      console.error("Erro ao deletar produto");
      setError(true);
    }
  }

  useEffect(() => {
    if (deletar_usuario_id != null) {
      fetchDeletarUsuario(deletar_usuario_id)
    }
    return () => {
      setDeletarUsuarioId(null)
      setMensagemDeletado(null)
      setOpenAlert(false)
    }
  }, [deletar_usuario_id])

  useEffect(() => {
    fetchUsuarios();
  }, [currentPage]);

  return (
    <div>
      <Typography variant='h2'>
        Usuarios
      </Typography>
      <Breadcrumb data_breadcrumb={[{ label: 'Usuarios', link: 'usuarios' }]} />
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
        <ButtonCreateNew description="Criar Novo usuario" handleViewForm={() => { setModalVisible(!modalVisible); setUsuarioId(null) }} />
      </div>
      <Usuarios usuarios={usuarios} loading={loading} handleEditar={handleEditar} handleExcluir={handleExcluir} handlePageChange={handlePageChange} />
      <ModalComponent
        content={<FormUsuario onSuccess={fetchUsuarios} usuario_id={usuario_id} />}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
