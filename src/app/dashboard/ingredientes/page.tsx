'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Paper, Alert, Collapse, IconButton } from '@mui/material';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import IngredienteTable from '@/app/ui/components/Modules/Ingrediente/Table/Ingrediente';
import IngredienteForm from '@/app/ui/components/Modules/Ingrediente/Form/Ingrediente';
import ButtonCreateNew from '@/app/ui/components/itens/ButtonCreateNew';
import ModalComponent from '@/app/ui/components/itens/ModalComponent';
import { Close, Kitchen } from '@mui/icons-material';
import { buscaIngredientes, deletaIngrediente } from '@/app/data/service/IngredienteService';

export default function IngredientesPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [ingredienteId, setIngredienteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [ingredientes, setIngredientes] = useState<any[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchIngredientes = async () => {
    setLoading(true);
    const response = await buscaIngredientes();
    if (response && response.data) {
      setIngredientes(response.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  const handleEditar = (id: number) => {
    setIngredienteId(id);
    setModalVisible(true);
  };

  const handleExcluir = async (id: number) => {
    if (confirm('Deseja excluir este ingrediente?')) {
      const resp = await deletaIngrediente(id);
      if (resp) {
        setAlertMessage('Ingrediente excluído com sucesso!');
        setOpenAlert(true);
        fetchIngredientes();
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e3a8a' }}>
        Ingredientes e Adicionais
      </Typography>
      <Breadcrumb data_breadcrumb={[{ label: 'Configurações', link: '#' }, { label: 'Ingredientes', link: 'ingredientes' }]} />

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
          description="Novo Ingrediente"
          handleViewForm={() => {
            setIngredienteId(null);
            setModalVisible(true);
          }}
        />
      </Box>

      <Paper sx={{ mt: 2, p: 2, borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <IngredienteTable
          ingredientes={ingredientes}
          loading={loading}
          handleEditar={handleEditar}
          handleExcluir={handleExcluir}
        />
      </Paper>

      <ModalComponent
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
        content={
          <IngredienteForm
            onSuccess={() => {
              setModalVisible(false);
              fetchIngredientes();
            }}
            ingrediente_id={ingredienteId}
          />
        }
      />
    </Box>
  );
}
