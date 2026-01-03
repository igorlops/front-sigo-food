'use client';

import React from 'react';
import {
    Paper,
    BottomNavigation,
    BottomNavigationAction,
    Badge,
    Box
} from '@mui/material';
import {
    Home as HomeIcon,
    RestaurantMenu as CardapioIcon,
    History as HistoryIcon,
    ShoppingCart as CartIcon
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ClientBottomNav() {
    const router = useRouter();
    const pathname = usePathname();
    const { items, restaurantSlug } = useCart();

    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    // Determine value based on current path
    const getValue = () => {
        if (pathname.includes('/pedidos')) return 2;
        if (pathname.includes('/carrinho')) return 3;
        if (pathname.includes('/produtos')) return 1;
        return 0; // Home
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        switch (newValue) {
            case 0:
                router.push(`/`);
                break;
            case 1:
                router.push(`/produtos`);
                break;
            case 2:
                router.push(`/pedidos`);
                break;
            case 3:
                router.push(`/carrinho`);
                break;
        }
    };

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                display: { xs: 'block', md: 'none' },
                zIndex: 1000,
                borderTop: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
            }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={getValue()}
                onChange={handleChange}
                sx={{
                    height: 70,
                    '& .MuiBottomNavigationAction-root': {
                        minWidth: 'auto',
                        padding: '6px 0',
                        color: 'text.secondary',
                        '&.Mui-selected': {
                            color: 'primary.main',
                        }
                    },
                    '& .MuiBottomNavigationAction-label': {
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        '&.Mui-selected': {
                            fontSize: '0.75rem',
                        }
                    }
                }}
            >
                <BottomNavigationAction label="Início" icon={<HomeIcon />} />
                <BottomNavigationAction label="Cardápio" icon={<CardapioIcon />} />
                <BottomNavigationAction label="Pedidos" icon={<HistoryIcon />} />
                <BottomNavigationAction
                    label="Carrinho"
                    icon={
                        <Badge badgeContent={itemCount} color="error">
                            <CartIcon />
                        </Badge>
                    }
                />
            </BottomNavigation>
        </Paper>
    );
}
