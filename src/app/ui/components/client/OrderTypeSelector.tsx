'use client';

import React from 'react';
import { useOrder, OrderType } from '@/context/OrderContext';
import { useRouter } from 'next/navigation';
import {
    Box,
    Button,
    Typography,
    Grid,
    Paper,
    Fade
} from '@mui/material';
import {
    DeliveryDining as DeliveryIcon,
    Storefront as PickupIcon,
    ArrowForward
} from '@mui/icons-material';

export default function OrderTypeSelector() {
    const { orderType, setOrderType } = useOrder();
    const router = useRouter();

    const handleSelect = (type: OrderType) => {
        setOrderType(type);
    };

    const handleContinue = () => {
        if (orderType) {
            router.push(`/produtos`);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 2 }}>
            <Typography variant="h4" fontWeight="bold" align="center" gutterBottom color="text.primary">
                Como você deseja receber seu pedido?
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
                Escolha a opção que melhor se adapta a você hoje
            </Typography>

            <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid item xs={12} md={6}>
                    <Paper
                        component="button"
                        onClick={() => handleSelect('delivery')}
                        elevation={orderType === 'delivery' ? 4 : 1}
                        sx={{
                            width: '100%',
                            p: 4,
                            borderRadius: 4,
                            border: '2px solid',
                            borderColor: orderType === 'delivery' ? '#2563eb' : 'transparent',
                            bgcolor: orderType === 'delivery' ? '#eff6ff' : 'background.paper',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                borderColor: orderType === 'delivery' ? '#2563eb' : 'grey.300',
                                boxShadow: 3
                            }
                        }}
                    >
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: '50%',
                                bgcolor: orderType === 'delivery' ? '#dbeafe' : 'grey.100',
                                color: orderType === 'delivery' ? '#1d4ed8' : 'grey.600'
                            }}
                        >
                            <DeliveryIcon sx={{ fontSize: 40 }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                Entrega (Delivery)
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Vamos levar até você
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper
                        component="button"
                        onClick={() => handleSelect('pickup')}
                        elevation={orderType === 'pickup' ? 4 : 1}
                        sx={{
                            width: '100%',
                            p: 4,
                            borderRadius: 4,
                            border: '2px solid',
                            borderColor: orderType === 'pickup' ? '#ea580c' : 'transparent',
                            bgcolor: orderType === 'pickup' ? '#fff7ed' : 'background.paper',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                borderColor: orderType === 'pickup' ? '#ea580c' : 'grey.300',
                                boxShadow: 3
                            }
                        }}
                    >
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: '50%',
                                bgcolor: orderType === 'pickup' ? '#ffedd5' : 'grey.100',
                                color: orderType === 'pickup' ? '#c2410c' : 'grey.600'
                            }}
                        >
                            <PickupIcon sx={{ fontSize: 40 }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                Retirada no Balcão
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Você busca no restaurante
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Fade in={!!orderType}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleContinue}
                        disabled={!orderType}
                        endIcon={<ArrowForward />}
                        sx={{
                            px: 6,
                            py: 1.5,
                            borderRadius: 3,
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            bgcolor: '#16a34a',
                            '&:hover': {
                                bgcolor: '#15803d',
                                transform: 'scale(1.02)'
                            },
                            transition: 'all 0.2s',
                            boxShadow: 4
                        }}
                    >
                        Continuar para o Cardápio
                    </Button>
                </Fade>
            </Box>
        </Box>
    );
}
