'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Badge,
    Container,
    Button
} from '@mui/material';
import {
    ShoppingCart as ShoppingCartIcon,
    Person as PersonIcon,
    RestaurantMenu as RestaurantMenuIcon,
    Receipt as OrderIcon,
    History as HistoryIcon
} from '@mui/icons-material';

export default function ClientHeader({ restaurantName }: { restaurantName: string }) {
    const { items, total } = useCart();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <AppBar position="fixed" color="inherit" elevation={1} sx={{ bgcolor: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 64 }}>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                color: 'primary.main',
                                '&:hover': { opacity: 0.8 },
                                fontSize: { xs: '1.1rem', sm: '1.25rem' }
                            }}
                        >
                            {restaurantName}
                        </Typography>
                    </Link>

                    {/* Desktop Navigation */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                        <Link href="/produtos" style={{ textDecoration: 'none' }}>
                            <Button color="inherit" startIcon={<RestaurantMenuIcon />}>Cardápio</Button>
                        </Link>

                        <Link href="/pedidos" style={{ textDecoration: 'none' }}>
                            <Button color="inherit" startIcon={<HistoryIcon />}>Meus Pedidos</Button>
                        </Link>

                        <Link href="/carrinho" style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText',
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: 'primary.dark' },
                                    transition: 'all 0.2s',
                                    fontWeight: 'bold'
                                }}
                            >
                                <Badge badgeContent={itemCount} color="error" showZero={false}>
                                    <ShoppingCartIcon fontSize="small" />
                                </Badge>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Carrinho (R$ {total.toFixed(2)})
                                </Typography>
                            </Box>
                        </Link>
                    </Box>

                    {/* Mobile/Tablet Simplified View (Only Cart Icon if needed, or nothing if using BottomNav) */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                        <Link href="/checkout" style={{ textDecoration: 'none' }}>
                            <IconButton color="primary">
                                <Badge badgeContent={itemCount} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
