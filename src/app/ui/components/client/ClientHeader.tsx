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
    RestaurantMenu as MenuIcon,
    Receipt as OrderIcon
} from '@mui/icons-material';

export default function ClientHeader({ restaurantName }: { restaurantName: string }) {
    const { items, total } = useCart();
    const pathname = usePathname();
    const tenant = pathname.split('/')[1];
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <AppBar position="fixed" color="inherit" elevation={1} sx={{ bgcolor: 'white' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 64 }}>
                    <Link href={`/${tenant}`} style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                color: 'primary.main',
                                '&:hover': { opacity: 0.8 }
                            }}
                        >
                            {restaurantName}
                        </Typography>
                    </Link>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Link href={`/pedido`} style={{ textDecoration: 'none' }}>
                            <Button
                                color="inherit"
                                startIcon={<OrderIcon />}
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                            >
                                Pedidos
                            </Button>
                        </Link>

                        <Link href={`/perfil`} style={{ textDecoration: 'none' }}>
                            <IconButton title="Meu Perfil" color="inherit">
                                <PersonIcon />
                            </IconButton>
                        </Link>

                        <Link href={`/carrinho`} style={{ textDecoration: 'none' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText',
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: 'primary.dark' },
                                    transition: 'background-color 0.2s',
                                    ml: 1
                                }}
                            >
                                <Badge badgeContent={itemCount} color="error" showZero={false}>
                                    <ShoppingCartIcon fontSize="small" color="inherit" />
                                </Badge>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                    sx={{ display: { xs: 'none', sm: 'block' } }}
                                >
                                    R$ {total.toFixed(2)}
                                </Typography>
                            </Box>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
