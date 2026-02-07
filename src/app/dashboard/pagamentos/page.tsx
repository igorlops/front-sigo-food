'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Paper, Alert, Collapse, IconButton } from '@mui/material';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import MetodoPagamentoTable from '@/app/ui/components/Modules/MetodoPagamento/Table/MetodoPagamento';
import MetodoPagamentoForm from '@/app/ui/components/Modules/MetodoPagamento/Form/MetodoPagamento';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close, Payment } from '@mui/icons-material';
import { buscaMetodosPagamento, deletaMetodoPagamento } from '@/app/data/service/MetodoPagamentoService';

export default function PagamentosPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [metodoId, setMetodoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [metodos, setMetodos] = useState<any[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchMetodos = async () => {
    setLoading(true);
    const response = await buscaMetodosPagamento();
    if (response && response.data) {
      setMetodos(response.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMetodos();
  }, []);

  const handleEditar = (id: number) => {
    setMetodoId(id);
    setModalVisible(true);
  };

  const handleExcluir = async (id: number) => {
    if (confirm('Deseja excluir este método de pagamento?')) {
      const resp = await deletaMetodoPagamento(id);
      if (resp) {
        setAlertMessage('Método de pagamento excluído com sucesso!');
        setOpenAlert(true);
        fetchMetodos();
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e3a8a' }}>
        Métodos de Pagamento
      </Typography>
      <Breadcrumb data_breadcrumb={[{ label: 'Configurações', link: '#' }, { label: 'Pagamentos', link: 'pagamentos' }]} />

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
          description="Novo Método"
          handleViewForm={() => {
            setMetodoId(null);
            setModalVisible(true);
          }}
        />
      </Box>

      <Paper sx={{ mt: 2, p: 2, borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <MetodoPagamentoTable
          metodos={metodos}
          loading={loading}
          handleEditar={handleEditar}
          handleExcluir={handleExcluir}
        />
      </Paper>

      <ModalComponent
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
        content={
          <MetodoPagamentoForm
            onSuccess={() => {
              setModalVisible(false);
              fetchMetodos();
            }}
            metodo_id={metodoId}
          />
        }
      />
    </Box>
  );
}
