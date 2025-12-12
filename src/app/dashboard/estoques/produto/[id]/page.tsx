'use client';

import { buscaEstoquePorProduto, buscaEstoques, Estoque, ShowEstoque } from '@/app/data/service/EstoqueService';
import Estoques from '@/app/ui/components/Modules/Estoque/Table/EstoqueProduto';
import FormEstoques from '@/app/ui/components/Modules/Estoque/Form/Estoques';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close } from '@mui/icons-material';
import { Alert, Collapse, IconButton, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EstoquesPage() {
  const params = useParams();
  const produto_id = params?.id ? Number(params.id) : null;

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [estoque_id, setEstoqueId] = useState<number | null>(null)
  const [deletar_estoque_id, setDeletarEstoqueId] = useState<number | null>(null)
  const [message_deletado, setMensagemDeletado] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [estoques, setEstoques] = useState<Estoque[] | null>(null);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setModalVisible(false)
  }

  const handleShow = (stock_id: number) => {
    if (confirm("Você deseja editar o produto?")) {
      setEstoqueId(stock_id)
      setModalVisible(true);
    }
  }
  // Função assíncrona para buscar Estoques
  async function fetchEstoques() {
    if (!produto_id) return;
    setLoading(true)
    try {
      const response = await buscaEstoquePorProduto(produto_id);
      console.log(response?.data)
      if (response?.data) {
        setEstoques(response.data.data.data);
      }
      setLoading(false)
    } catch (err) {
      console.error("Erro ao buscar Estoques:", err);
      setError(true);
    }
  }

  useEffect(() => {
    fetchEstoques();
  }, [produto_id]);

  return (
    <div>
      <Typography variant='h2'>
        Estoques
      </Typography>
      <Breadcrumb key='estoques' data_breadcrumb={[{ label: 'Estoques', link: 'estoques' }, { label: 'Produto', link: 'produto' }]} />
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
        <ButtonCreateNew description="Criar Novo produto" handleViewForm={() => { setModalVisible(!modalVisible); setEstoqueId(null) }} />
      </div>
      <Estoques estoques={estoques} loading={loading} handleShow={handleShow} />
      <ModalComponent
        content={<FormEstoques onSuccess={fetchEstoques} estoque_id={estoque_id} />}
        open={modalVisible}
        handleClose={handleClose}
      />
    </div>
  );
}
