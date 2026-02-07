'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Paper, Alert, Collapse, IconButton } from '@mui/material';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import TaxaPedidoTable from '@/app/ui/components/Modules/TaxaPedido/Table/TaxaPedido';
import TaxaPedidoForm from '@/app/ui/components/Modules/TaxaPedido/Form/TaxaPedido';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close, AttachMoney } from '@mui/icons-material';
import { buscaTaxasPedido, deletaTaxaPedido } from '@/app/data/service/TaxaPedidoService';

export default function TaxasPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [taxaId, setTaxaId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [taxas, setTaxas] = useState<any[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchTaxas = async () => {
    setLoading(true);
    const response = await buscaTaxasPedido();
    if (response && response.data) {
      setTaxas(response.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTaxas();
  }, []);

  const handleEditar = (id: number) => {
    setTaxaId(id);
    setModalVisible(true);
  };

  const handleExcluir = async (id: number) => {
    if (confirm('Deseja excluir esta taxa?')) {
      const resp = await deletaTaxaPedido(id);
      if (resp) {
        setAlertMessage('Taxa excluída com sucesso!');
        setOpenAlert(true);
        fetchTaxas();
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e3a8a' }}>
        Taxas e Entregas
      </Typography>
      <Breadcrumb data_breadcrumb={[{ label: 'Configurações', link: '#' }, { label: 'Taxas', link: 'taxas' }]} />

      <Collapse in={openAlert}>
        <Alert
          severity="success"
          sx={{ mt: 2, borderRadius: 2 }}
          action={
            <IconButton size="small" onClick={() => setOpenAlert(false)}>
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          {alertMessage}
        </Alert>
      </Collapse>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonCreateNew
          description="Nova Taxa"
          handleViewForm={() => {
            setTaxaId(null);
            setModalVisible(true);
          }}
        />
      </Box>

      <Paper sx={{ mt: 2, p: 2, borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <TaxaPedidoTable
          taxas={taxas}
          loading={loading}
          handleEditar={handleEditar}
          handleExcluir={handleExcluir}
        />
      </Paper>

      <ModalComponent
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
        content={
          <TaxaPedidoForm
            onSuccess={() => {
              setModalVisible(false);
              fetchTaxas();
            }}
            taxa_id={taxaId}
          />
        }
      />
    </Box>
  );
}
