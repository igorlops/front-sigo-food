'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    List,
    ListItem,
    Divider,
    Chip,
    CircularProgress,
    Fade,
    InputAdornment,
    Alert
} from '@mui/material';
import {
    Search as SearchIcon,
    History as HistoryIcon,
    Email as EmailIcon,
    AccessTime as TimeIcon,
    DoubleArrow as ArrowIcon,
    Phone as PhoneIcon,
    VpnKey as OtpIcon,
    ArrowBack as BackIcon
} from '@mui/icons-material';
import { useParams } from 'next/navigation';
import { buscaPedidosPorEmail, Pedido } from '@/app/data/service/PedidoService';
import { identificaCliente, verificaOtpCliente, Cliente } from '@/app/data/service/ClienteService';
import { getRestaurantInfo, RestauranteInfo } from '@/app/data/service/CardapioService';

type VerificationStep = 'identify' | 'otp' | 'history';

export default function OrderHistory() {
    const params = useParams();
    const restaurantSlug = params.restaurant as string;

    const [step, setStep] = useState<VerificationStep>('identify');
    const [restaurantInfo, setRestaurantInfo] = useState<RestauranteInfo | null>(null);
    const [identifier, setIdentifier] = useState('');
    const [otp, setOtp] = useState('');
    const [clientId, setClientId] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [client, setClient] = useState<Cliente | null>(null);
    const [orders, setOrders] = useState<Pedido[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRestInfo = async () => {
            const info = await getRestaurantInfo(restaurantSlug);
            if (info) setRestaurantInfo((info as any).data || info);
        };
        fetchRestInfo();

        const storedUser = localStorage.getItem('sigo_user_profile');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user.email) setIdentifier(user.email);
                else if (user.phone) setIdentifier(user.phone);
            } catch (e) { }
        }
    }, [restaurantSlug]);

    const handleIdentify = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!identifier || !restaurantInfo) return;

        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const response = await identificaCliente(identifier, restaurantInfo.id.toString());
            if (response && response.client_id) {
                setClientId(response.client_id);
                setSuccessMessage(response.message || 'Código enviado para o seu e-mail.');
                setStep('otp');
            } else {
                setError('Não foi possível identificar seu cadastro. Verifique os dados informados.');
            }
        } catch (err) {
            setError('Erro ao processar identificação.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!otp || !clientId || !restaurantInfo) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await verificaOtpCliente(clientId, restaurantInfo.id.toString(), otp);
            if (response && response.data) {
                setClient(response.data);
                // Salva perfil pra conveniência
                localStorage.setItem('sigo_user_profile', JSON.stringify({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone
                }));

                // Busca pedidos
                const ordersRes = await buscaPedidosPorEmail(response.data.email);
                if (ordersRes && ordersRes.data) {
                    const ordersList = (ordersRes.data as any).data || ordersRes.data;
                    setOrders(Array.isArray(ordersList) ? ordersList : []);
                }
                setStep('history');
            } else {
                setError('Código inválido ou expirado.');
            }
        } catch (err) {
            setError('Erro ao verificar código.');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (statusName: string) => {
        const name = (statusName || '').toLowerCase();
        if (name.includes('pendente')) return 'warning';
        if (name.includes('preparo')) return 'info';
        if (name.includes('entrega') || name.includes('saiu')) return 'primary';
        if (name.includes('concluido') || name.includes('finalizado')) return 'success';
        if (name.includes('cancelado')) return 'error';
        return 'default';
    };

    if (step === 'identify') {
        return (
            <Box sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
                    <HistoryIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>Acompanhar Pedidos</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Informe seu e-mail ou telefone para receber um código de acesso.
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleIdentify}>
                        <TextField
                            fullWidth
                            label="E-mail ou Telefone"
                            placeholder="seu@email.com ou (00) 00000-0000"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            type="submit"
                            disabled={isLoading || !identifier}
                            sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Receber Código'}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        );
    }

    if (step === 'otp') {
        return (
            <Box sx={{ maxWidth: 500, mx: 'auto', p: 2 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
                    <OtpIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>Verifique seu E-mail</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {successMessage}
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleVerifyOtp}>
                        <TextField
                            fullWidth
                            label="Código de 6 dígitos"
                            placeholder="000000"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold' } }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            type="submit"
                            color="success"
                            disabled={isLoading || otp.length < 6}
                            sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold', mb: 2 }}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verificar e Acessar'}
                        </Button>
                        <Button
                            startIcon={<BackIcon />}
                            onClick={() => setStep('identify')}
                            sx={{ textTransform: 'none' }}
                        >
                            Voltar e alterar telefone
                        </Button>
                    </Box>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">Meus Pedidos</Typography>
                    <Typography variant="body1" color="text.secondary">Olá, {client?.name}</Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<BackIcon />}
                    onClick={() => setStep('identify')}
                    sx={{ borderRadius: 2 }}
                >
                    Sair
                </Button>
            </Box>

            {orders.length > 0 ? (
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {orders.map((order) => (
                        <Fade in={true} key={order.id}>
                            <Paper elevation={1} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                                <ListItem sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Box>
                                            <Typography variant="subtitle2" color="text.secondary">Pedido #{order.id}</Typography>
                                            <Typography variant="h6" fontWeight="bold">R$ {parseFloat(order.total_value.toString()).toFixed(2)}</Typography>
                                        </Box>
                                        <Chip
                                            label={order.status_name}
                                            color={getStatusColor(order.status_name) as any}
                                            sx={{ fontWeight: 'bold', borderRadius: 2 }}
                                        />
                                    </Box>

                                    <Divider sx={{ my: 1.5 }} />

                                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <TimeIcon fontSize="small" color="action" />
                                            <Typography variant="body2">{new Date(order.created_at).toLocaleDateString()} às {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <ArrowIcon fontSize="small" color="action" />
                                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                                {order.order_type === 1 ? 'Delivery' : 'Retirada'}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {order.delivery_address && (
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Entrega em: {order.delivery_address}
                                        </Typography>
                                    )}
                                </ListItem>
                            </Paper>
                        </Fade>
                    ))}
                </List>
            ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <HistoryIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">Nenhum pedido encontrado.</Typography>
                </Box>
            )}
        </Box>
    );
}
