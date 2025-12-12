'use client';

import { buscaEstoques, ShowEstoque } from '@/app/data/service/EstoqueService';
import Estoques from '@/app/ui/components/Modules/Estoque/Table/Estoques';
import FormEstoques from '@/app/ui/components/Modules/Estoque/Form/Estoques';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close } from '@mui/icons-material';
import { Alert, Collapse, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EstoquesPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [estoque_id, setEstoqueId] = useState<number | null>(null)
  const [estoques, setEstoques] = useState<ShowEstoque[] | null>(null); // Agora o estado é um array de Estoque
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleClose = () => {
    setModalVisible(false)
  }

  const handleShow = (stock_id: number) => {
    setEstoqueId(stock_id)
    router.push(`/dashboard/estoques/produto/${stock_id}`);
  }
  // Função assíncrona para buscar Estoques
  async function fetchEstoques() {
    setLoading(true)
    try {
      const response = await buscaEstoques();
      console.log(response?.data.data)
      if (response?.data) {
        setEstoques(response.data.data);

      }
      setLoading(false)
    } catch (err) {
      console.error("Erro ao buscar Estoques:", err);
      setError(true);
    }
  }

  useEffect(() => {
    fetchEstoques();
  }, []); // O array vazio garante que a função execute apenas uma vez

  return (
    <div>
      <Typography variant='h2'>
        Estoques
      </Typography>
      <Breadcrumb data_breadcrumb={[{ label: 'Estoques', link: 'estoques' }]} />
      <p className='text-red-500 text-sm'>{error}</p>
      <div>
        <ButtonCreateNew description="Criar Novo Estoque" handleViewForm={() => { setModalVisible(!modalVisible); setEstoqueId(null) }} />
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
