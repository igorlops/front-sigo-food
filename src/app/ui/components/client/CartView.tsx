'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useOrder } from '@/context/OrderContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Box,
    Typography,
    Button,
    Paper,
    List,
    ListItem,
    IconButton,
    Divider,
    Avatar
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    DeleteOutline as DeleteIcon,
    ShoppingBag as EmptyCartIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

export default function CartView() {
    const { items, removeFromCart, updateQuantity, subtotal, total, clearCart } = useCart();
    const { orderType } = useOrder();
    const pathname = usePathname();
    const tenant = pathname.split('/')[1];

    if (items.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, textAlign: 'center' }}>
                <Box
                    sx={{
                        bgcolor: 'grey.100',
                        p: 3,
                        borderRadius: '50%',
                        mb: 3,
                        color: 'text.secondary'
                    }}
                >
                    <EmptyCartIcon sx={{ fontSize: 48 }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Seu carrinho está vazio
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Adicione itens deliciosos para continuar.
                </Typography>
                <Link href={`/${tenant}/produtos`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" size="large" sx={{ borderRadius: 2 }}>
                        Ver Cardápio
                    </Button>
                </Link>
            </Box>
        );
    }

    return (
        <Paper elevation={0} variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Box
                sx={{
                    p: 3,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Seu Pedido
                </Typography>
                <Button
                    color="error"
                    size="small"
                    onClick={clearCart}
                    sx={{ textTransform: 'none' }}
                >
                    Limpar carrinho
                </Button>
            </Box>

            <List disablePadding>
                {items.map((item, index) => (
                    <React.Fragment key={item.product.id}>
                        {index > 0 && <Divider />}
                        <ListItem sx={{ p: 2, alignItems: 'flex-start', gap: 2 }}>
                            {/* Imagem */}
                            <Avatar
                                variant="rounded"
                                src={item.product.image_path}
                                alt={item.product.name || 'Imagem do produto'}
                                sx={{ width: 80, height: 80, bgcolor: 'grey.200' }}
                            >
                                <EmptyCartIcon color="disabled" />
                            </Avatar>

                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                        {item.product.name}
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                                        R$ {((parseFloat(item.product.price?.toString() || '0') * item.quantity)).toFixed(2)}
                                    </Typography>
                                </Box>

                                <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 2 }}>
                                    {item.product.description}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                                    {/* Quantidade Control */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 2,
                                            bgcolor: 'grey.50'
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ px: 1, minWidth: 24, textAlign: 'center', fontWeight: 'bold' }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    <Button
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => removeFromCart(item.product.id)}
                                        sx={{ textTransform: 'none' }}
                                    >
                                        Remover
                                    </Button>
                                </Box>
                            </Box>
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>

            <Box sx={{ p: 3, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1" color="text.secondary">Subtotal</Typography>
                    <Typography variant="body1" fontWeight="medium">R$ {subtotal.toFixed(2)}</Typography>
                </Box>

                {orderType && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">Tipo de Entrega</Typography>
                        <Typography variant="body2" fontWeight="medium" sx={{ textTransform: 'uppercase' }}>
                            {orderType === 'pickup' ? 'Retirada' : 'Delivery'}
                        </Typography>
                    </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">Total</Typography>
                    <Typography variant="h5" fontWeight="bold" color="primary.main">
                        R$ {total.toFixed(2)}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        py: 1.5,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        bgcolor: 'success.main',
                        '&:hover': { bgcolor: 'success.dark' }
                    }}
                >
                    Finalizar Pedido
                </Button>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Link href={`/${tenant}/produtos`} style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ '&:hover': { textDecoration: 'underline' }, cursor: 'pointer' }}
                        >
                            ou Continuar Comprando →
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Paper>
    );
}
