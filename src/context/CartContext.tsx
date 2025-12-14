'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Produto } from '@/app/data/service/ProdutoService';

export interface CartItem {
    product: Produto;
    quantity: number;
    observation?: string;
}

interface CartContextData {
    items: CartItem[];
    addToCart: (product: Produto, quantity: number, observation?: string) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    total: number; // Pode incluir taxas futuramente
    restaurantSlug: string | null;
    initCart: (slug: string) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children, restaurantSlug: initialSlug }: { children: ReactNode; restaurantSlug: string }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [restaurantSlug, setRestaurantSlug] = useState<string>(initialSlug);

    // Se mudar o slug via prop, atualiza o estado
    useEffect(() => {
        if (initialSlug && initialSlug !== restaurantSlug) {
            setRestaurantSlug(initialSlug);
            setItems([]); // Limpa ao mudar de restaurante
        }
    }, [initialSlug]);

    // Persistência local
    useEffect(() => {
        if (restaurantSlug) {
            const savedCart = localStorage.getItem(`@sigofood:cart:${restaurantSlug}`);
            if (savedCart) {
                setItems(JSON.parse(savedCart));
            }
        }
    }, [restaurantSlug]);

    useEffect(() => {
        if (restaurantSlug) {
            localStorage.setItem(`@sigofood:cart:${restaurantSlug}`, JSON.stringify(items));
        }
    }, [items, restaurantSlug]);

    const initCart = (slug: string) => {
        if (restaurantSlug !== slug) {
            setRestaurantSlug(slug);
            setItems([]); // Limpa se mudar de restaurante (segurança)
        }
    };

    const addToCart = (product: Produto, quantity: number, observation?: string) => {
        setItems(prev => {
            const existingItemIndex = prev.findIndex(item => item.product.id === product.id);
            if (existingItemIndex >= 0) {
                const newItems = [...prev];
                newItems[existingItemIndex].quantity += quantity;
                // Atualiza observação apenas se for nova
                if (observation) newItems[existingItemIndex].observation = observation;
                return newItems;
            } else {
                return [...prev, { product, quantity, observation }];
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems(prev => prev.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setItems([]);
    };

    const subtotal = items.reduce((acc, item) => {
        // Assume price é string '10.00' ou number. Ajuste conforme ProdutoService.
        // O ProdutoService define price como string | null.
        const price = item.product.price ? parseFloat(item.product.price.toString()) : 0;
        return acc + (price * item.quantity);
    }, 0);

    const total = subtotal; // Adicionar lógica de taxas aqui se necessário

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            subtotal,
            total,
            restaurantSlug,
            initCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
