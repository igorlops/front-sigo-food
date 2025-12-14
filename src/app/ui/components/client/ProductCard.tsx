'use client';

import React, { useState } from 'react';
import { Produto } from '@/app/data/service/ProdutoService';
import { useCart } from '@/context/CartContext';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Chip
} from '@mui/material';
import { AddShoppingCart as AddCartIcon, Check as CheckIcon } from '@mui/icons-material';

interface ProductCardProps {
    product: Produto;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, 1);

        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <Card
            elevation={1}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                },
                borderRadius: 3,
                overflow: 'hidden'
            }}
        >
            {product.image_path ? (
                <CardMedia
                    component="img"
                    height="180"
                    image={product.image_path}
                    alt={product.name || 'Produto'}
                    sx={{ objectFit: 'cover' }}
                />
            ) : (
                <Box
                    sx={{
                        height: 180,
                        bgcolor: 'grey.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'text.disabled'
                    }}
                >
                    <Typography variant="caption">Sem imagem</Typography>
                </Box>
            )}

            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography gutterBottom variant="h6" component="div" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    mb: 1
                }}>
                    {product.description}
                </Typography>
            </CardContent>

            <Box sx={{ px: 2, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" color="primary.main" fontWeight="bold">
                    R$ {Number(product.price).toFixed(2)}
                </Typography>

                <Button
                    variant={isAdding ? "outlined" : "contained"}
                    color={isAdding ? "success" : "primary"}
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    startIcon={isAdding ? <CheckIcon /> : <AddCartIcon />}
                    size="small"
                    sx={{
                        borderRadius: 10,
                        textTransform: 'none',
                        px: 2,
                        fontWeight: 'medium',
                        minWidth: 100
                    }}
                >
                    {isAdding ? 'Adicionado' : 'Adicionar'}
                </Button>
            </Box>
        </Card>
    );
}
