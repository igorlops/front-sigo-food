'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Divider,
    Grid,
    CircularProgress,
    Fade,
    Alert,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@mui/material';
import {
    Person as PersonIcon,
    LocationOn as LocationIcon,
    Send as SendIcon,
    ShoppingBasket
} from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useOrder } from '@/context/OrderContext';
import { adicionaPedido } from '@/app/data/service/PedidoService';
import { getRestaurantInfo, RestauranteInfo } from '@/app/data/service/CardapioService';

export default function CheckoutForm() {
    const router = useRouter();
    const params = useParams();
    const restaurantSlug = params.restaurant as string;
    const { items, total, clearCart } = useCart();
    const { orderType, setOrderType } = useOrder();

    const [restaurantInfo, setRestaurantInfo] = useState<RestauranteInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        complement: '',
        payment_method: 'money'
    });

    useEffect(() => {
        const fetchRestaurantInfo = async () => {
            const info = await getRestaurantInfo(restaurantSlug);
            if (info) {
                setRestaurantInfo((info as any).data || info);
            }
        };

        const storedUser = localStorage.getItem('sigo_user_profile');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setFormData(prev => ({
                    ...prev,
                    name: user.name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    cep: user.cep || '',
                    street: user.street || '',
                    number: user.number || '',
                    neighborhood: user.neighborhood || '',
                    city: user.city || '',
                    complement: user.complement || ''
                }));
            } catch (e) {
                console.error("Error parsing stored user profile", e);
            }
        }

        fetchRestaurantInfo();
    }, [restaurantSlug]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCEPBlur = async () => {
        const cep = formData.cep.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setFormData(prev => ({
                        ...prev,
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade
                    }));
                }
            } catch (err) {
                console.error("Erro ao buscar CEP", err);
            }
        }
    };

    const handleOrderTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderType(e.target.value as any);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!restaurantInfo) return;

        if (!orderType) {
            setError('Por favor, selecione se deseja Delivery ou Retirada.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const fullAddress = orderType === 'delivery'
                ? `${formData.street}, ${formData.number}${formData.complement ? ` - ${formData.complement}` : ''}, ${formData.neighborhood}, ${formData.city} - CEP: ${formData.cep}`
                : null;

            const payload = {
                client: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone
                },
                order: {
                    restaurant_id: restaurantInfo.id,
                    order_type: orderType === 'delivery' ? 1 : 2,
                    delivery_address: fullAddress,
                    total_value: total,
                    payment_method_id: 1, // Fixado como 1 ou vindo do form se mapeado
                    products: items.map(item => ({
                        product_id: item.product.id,
                        quantity: item.quantity,
                        price: item.product.price,
                        observation: item.observation
                    }))
                }
            };

            const orderResponse = await adicionaPedido(payload);

            if (orderResponse && (!orderResponse.data.error || orderResponse.data === undefined)) {
                // Salva no localStorage para futuras visitas
                localStorage.setItem('sigo_user_profile', JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    cep: formData.cep,
                    street: formData.street,
                    number: formData.number,
                    neighborhood: formData.neighborhood,
                    city: formData.city,
                    complement: formData.complement
                }));

                clearCart();
                router.push(`/pedidos?email=${formData.email}`);
            } else {
                throw new Error((orderResponse as any)?.data?.message || 'Falha ao realizar pedido');
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Ocorreu um erro ao processar seu pedido.');
        } finally {
            setIsLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <Box textAlign="center" py={8}>
                <Typography variant="h5">Seu carrinho está vazio.</Typography>
                <Button onClick={() => router.push('/produtos')} sx={{ mt: 2 }}>
                    Voltar ao Cardápio
                </Button>
            </Box>
        );
    }

    return (
        <Fade in={true}>
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
                <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', mb: 4 }}>
                    <Box sx={{ p: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                        <Typography variant="h5" fontWeight="bold">Finalizar Pedido</Typography>
                        <Typography variant="body2">Informe seus dados para concluir a compra</Typography>
                    </Box>

                    <Box sx={{ p: 4 }}>
                        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                        <Box sx={{ mb: 4, p: 2, borderRadius: 2, bgcolor: !orderType ? 'warning.50' : 'transparent', border: !orderType ? '1px dashed' : 'none', borderColor: 'warning.main' }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold" display="flex" alignItems="center" gap={1}>
                                <LocationIcon color={!orderType ? 'warning' : 'primary'} /> Tipo de Entrega
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    value={orderType || ''}
                                    onChange={handleOrderTypeChange}
                                >
                                    <FormControlLabel value="delivery" control={<Radio />} label="Delivery (Entrega)" />
                                    <FormControlLabel value="pickup" control={<Radio />} label="Retirada no Balcão" />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        <Typography variant="h6" gutterBottom fontWeight="bold" display="flex" alignItems="center" gap={1}>
                            <PersonIcon color="primary" /> Seus Dados
                        </Typography>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Nome Completo"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="E-mail"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Telefone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="(00) 00000-0000"
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 4 }} />

                        {orderType === 'delivery' && (
                            <>
                                <Typography variant="h6" gutterBottom fontWeight="bold" display="flex" alignItems="center" gap={1}>
                                    <LocationIcon color="error" /> Endereço de Entrega
                                </Typography>
                                <Grid container spacing={2} sx={{ mb: 4 }}>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required={orderType === 'delivery'}
                                            fullWidth
                                            label="CEP"
                                            name="cep"
                                            value={formData.cep}
                                            onChange={handleChange}
                                            onBlur={handleCEPBlur}
                                            placeholder="00000-000"
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <TextField
                                            required={orderType === 'delivery'}
                                            fullWidth
                                            label="Cidade"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <TextField
                                            required={orderType === 'delivery'}
                                            fullWidth
                                            label="Rua / Logradouro"
                                            name="street"
                                            value={formData.street}
                                            onChange={handleChange}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            required={orderType === 'delivery'}
                                            fullWidth
                                            label="Número"
                                            name="number"
                                            value={formData.number}
                                            onChange={handleChange}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            required={orderType === 'delivery'}
                                            fullWidth
                                            label="Bairro"
                                            name="neighborhood"
                                            value={formData.neighborhood}
                                            onChange={handleChange}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Complemento"
                                            name="complement"
                                            value={formData.complement}
                                            onChange={handleChange}
                                            placeholder="Apt, Bloco, Referência..."
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        />
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 4 }} />
                            </>
                        )}

                        <Typography variant="h6" gutterBottom fontWeight="bold" display="flex" alignItems="center" gap={1}>
                            <ShoppingBasket color="success" /> Resumo e Pagamento
                        </Typography>

                        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography color="text.secondary">Subtotal ({items.length} itens)</Typography>
                                <Typography fontWeight="medium">R$ {total.toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography color="text.secondary">Tipo de Pedido</Typography>
                                <Typography
                                    fontWeight="medium"
                                    sx={{ textTransform: 'uppercase' }}
                                    color={!orderType ? 'error.main' : 'inherit'}
                                >
                                    {orderType ? (orderType === 'delivery' ? 'Delivery' : 'Retirada') : 'Não selecionado'}
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6" fontWeight="bold">Total</Typography>
                                <Typography variant="h6" fontWeight="bold" color="primary.main">R$ {total.toFixed(2)}</Typography>
                            </Box>
                        </Box>

                        <FormControl component="fieldset">
                            <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>Forma de Pagamento (na entrega)</FormLabel>
                            <RadioGroup
                                name="payment_method"
                                value={formData.payment_method}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel value="money" control={<Radio />} label="Dinheiro" />
                                <FormControlLabel value="card" control={<Radio />} label="Cartão (Maquininha)" />
                                <FormControlLabel value="pix" control={<Radio />} label="PIX" />
                            </RadioGroup>
                        </FormControl>
                    </Box>

                    <Box sx={{ p: 4, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isLoading}
                            startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                            sx={{
                                px: 8,
                                py: 2,
                                borderRadius: 3,
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                bgcolor: 'success.main',
                                '&:hover': { bgcolor: 'success.dark' },
                                boxShadow: 4
                            }}
                        >
                            {isLoading ? 'Processando...' : 'Confirmar e Enviar Pedido'}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Fade>
    );
}
