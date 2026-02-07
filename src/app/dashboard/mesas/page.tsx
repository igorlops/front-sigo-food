'use client';

import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  TextField
} from '@mui/material';
import {
  Restaurant,
  AccessTime,
  AttachMoney,
  Info,
  Refresh,
  TableBar,
  CheckBox,
  ErrorOutline,
  ReceiptLong,
  Add
} from '@mui/icons-material';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import { buscarDashboardMesas, liberarMesa, ocuparMesa, alterarStatusMesa, adicionarMesa, Mesa, DashboardStats, CriarMesaData } from '@/app/data/service/MesaService';

export default function MesasPage() {
  const [tables, setTables] = useState<Mesa[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total_tables: 0,
    free_tables: 0,
    occupied_tables: 0,
    bill_requested_tables: 0,
    reserved_tables: 0,
    total_open_amount: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState<Mesa | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newTable, setNewTable] = useState<CriarMesaData>({
    table_number: '',
    capacity: 4,
    location: 'Salão Principal'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await buscarDashboardMesas();
      if (response && !response.error && response) {
        setTables(response || []);
        if (response.summary) {
          setStats(response.summary);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados das mesas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Opcional: Polling a cada 30 segundos para tempo real
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const handleRelease = async (id: number) => {
    if (!confirm('Deseja liberar esta mesa?')) return;
    try {
      const res = await liberarMesa(id);
      if (res && !res.error) {
        setSelectedTable(null);
        fetchData();
      }
    } catch (error) {
      console.error('Erro ao liberar mesa:', error);
    }
  };

  const handleOccupy = async (id: number) => {
    const people = prompt('Número de pessoas:', '2');
    if (!people) return;
    try {
      const res = await ocuparMesa(id, parseInt(people));
      if (res && !res.error) {
        setSelectedTable(null);
        fetchData();
      }
    } catch (error) {
      console.error('Erro ao ocupar mesa:', error);
    }
  };

  const handleRequestBill = async (id: number) => {
    try {
      const res = await alterarStatusMesa(id, 'bill_requested');
      if (res && !res.error) {
        setSelectedTable(null);
        fetchData();
      }
    } catch (error) {
      console.error('Erro ao pedir conta:', error);
    }
  };

  const handleCreateTable = async () => {
    if (!newTable.table_number) return;
    try {
      const res = await adicionarMesa(newTable);
      if (res && !res.error) {
        setOpenCreateDialog(false);
        setNewTable({ table_number: '', capacity: 4, location: 'Salão Principal' });
        fetchData();
      }
    } catch (error) {
      console.error('Erro ao criar mesa:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return '#ef4444'; // Red
      case 'free': return '#10b981'; // Green
      case 'bill_requested': return '#f59e0b'; // Amber
      case 'reserved': return '#3b82f6'; // Blue
      default: return '#9ca3af';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'occupied': return 'Ocupada';
      case 'free': return 'Disponível';
      case 'bill_requested': return 'Pediu a Conta';
      case 'reserved': return 'Reservada';
      default: return status;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
            Painel de Mesas
          </Typography>
          <Breadcrumb data_breadcrumb={[{ label: 'Operacional', link: '#' }, { label: 'Mesas', link: 'mesas' }]} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<TableBar />}
            onClick={() => setOpenCreateDialog(true)}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Nova Mesa
          </Button>
          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Refresh />}
            onClick={handleRefresh}
            disabled={loading}
            sx={{ bgcolor: '#1e3a8a', borderRadius: 2, px: 3 }}
          >
            Atualizar
          </Button>
        </Box>
      </Box>

      {/* Estatísticas Rápidas */}
      <Grid container spacing={2} sx={{ mb: 4, mt: 1 }}>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 3, borderLeft: '5px solid #10b981', bgcolor: 'rgba(16, 185, 129, 0.05)' }}>
            <Typography variant="body2" color="text.secondary">Mesas Livres</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{stats?.free_tables ?? 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 3, borderLeft: '5px solid #ef4444', bgcolor: 'rgba(239, 68, 68, 0.05)' }}>
            <Typography variant="body2" color="text.secondary">Mesas Ocupadas</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{stats?.occupied_tables ?? 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 3, borderLeft: '5px solid #f59e0b', bgcolor: 'rgba(245, 158, 11, 0.05)' }}>
            <Typography variant="body2" color="text.secondary">Aguardando Conta</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{stats?.bill_requested_tables ?? 0}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 2, borderRadius: 3, borderLeft: '5px solid #1e3a8a', bgcolor: 'rgba(30, 58, 138, 0.05)' }}>
            <Typography variant="body2" color="text.secondary">Total em Aberto</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
              R$ {(stats?.total_open_amount ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Grid de Mesas */}
      {loading && tables.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {tables.map((table) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={table.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 0,
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e5e7eb',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                    borderColor: getStatusColor(table.status)
                  }
                }}
              >
                <Box sx={{ bgcolor: getStatusColor(table.status), p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TableBar />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Mesa {table.table_number}</Typography>
                  </Box>
                  <Chip
                    label={getStatusLabel(table.status)}
                    size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, border: 'none' }}
                  />
                </Box>

                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                      <AccessTime fontSize="small" />
                      <Typography variant="body2">{table.since || '-'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#10b981', fontWeight: 'bold' }}>
                      <AttachMoney fontSize="small" />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {(table.total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<Info fontSize="small" />}
                      onClick={() => setSelectedTable(table)}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Detalhes
                    </Button>
                    <Tooltip title="Imprimir Pré-conta">
                      <IconButton size="small" sx={{ color: '#1e3a8a', border: '1px solid #e5e7eb', borderRadius: 2 }}>
                        <ReceiptLong />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
          {tables.length === 0 && !loading && (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography color="text.secondary">Nenhuma mesa cadastrada.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Dialog Details */}
      <Dialog
        open={Boolean(selectedTable)}
        onClose={() => setSelectedTable(null)}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle sx={{ bgcolor: selectedTable ? getStatusColor(selectedTable.status) : '#1e3a8a', color: 'white' }}>
          Mesa {selectedTable?.table_number} - {getStatusLabel(selectedTable?.status || '')}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedTable?.current_session?.orders && selectedTable.current_session.orders.length > 0 ? (
            <List>
              {selectedTable.current_session.orders.map((order: any, idx: number) => (
                <ListItem key={idx} sx={{ px: 0 }}>
                  <ListItemText
                    primary={order.product?.name || 'Produto'}
                    secondary={`Qtd: ${order.quantity}`}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    R$ {(order.unit_price * order.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Restaurant sx={{ fontSize: 48, color: '#e5e7eb', mb: 2 }} />
              <Typography color="text.secondary">
                {selectedTable?.status === 'free' ? 'Mesa disponível para ocupação.' : 'Nenhum item consumido ainda.'}
              </Typography>
            </Box>
          )}

          {selectedTable?.status !== 'free' && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Parcial:</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                  R$ {(selectedTable?.total || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
          <Button onClick={() => setSelectedTable(null)} sx={{ color: 'text.secondary' }}>Fechar</Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {selectedTable?.status === 'free' ? (
              <Button
                variant="contained"
                color="success"
                onClick={() => selectedTable?.id && handleOccupy(selectedTable.id)}
                sx={{ borderRadius: 2 }}
              >
                Ocupar Mesa
              </Button>
            ) : (
              <>
                {selectedTable?.status === 'occupied' && (
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => selectedTable?.id && handleRequestBill(selectedTable.id)}
                    sx={{ borderRadius: 2 }}
                  >
                    Pedir Conta
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => selectedTable?.id && handleRelease(selectedTable.id)}
                  sx={{ borderRadius: 2 }}
                >
                  Liberar Mesa
                </Button>
              </>
            )}
          </Box>
        </DialogActions>
      </Dialog>

      {/* Dialog Create Table */}
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle sx={{ bgcolor: '#1e3a8a', color: 'white' }}>
          Cadastrar Nova Mesa
        </DialogTitle>
        <DialogContent sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">Número da Mesa</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Ex: 01, 15A"
              value={newTable.table_number}
              onChange={(e) => setNewTable({ ...newTable, table_number: e.target.value })}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Capacidade (Pessoas)</Typography>
            <TextField
              fullWidth
              size="small"
              type="number"
              value={newTable.capacity}
              onChange={(e) => setNewTable({ ...newTable, capacity: parseInt(e.target.value) })}
            />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Localização</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Ex: Salão, Varanda"
              value={newTable.location}
              onChange={(e) => setNewTable({ ...newTable, location: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenCreateDialog(false)} sx={{ color: 'text.secondary' }}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleCreateTable}
            disabled={!newTable.table_number}
            sx={{ bgcolor: '#1e3a8a', borderRadius: 2 }}
          >
            Salvar Mesa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
