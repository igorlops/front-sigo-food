'use client';

import React, { useState } from 'react';
import { Produto } from '@/app/data/service/ProdutoService';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
    product: Produto;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, 1);

        // Feedback visual simples
        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            {product.image_path && (
                <div className="relative w-full h-40 mb-4 overflow-hidden rounded-md group">
                    <img
                        src={product.image_path}
                        alt={product.name || 'Produto'}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-green-600 text-lg">
                    R$ {product.price}
                </span>

                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    style={!isAdding ? { backgroundColor: 'var(--color-primary, #2563eb)' } : {}}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isAdding
                        ? 'bg-green-100 text-green-700'
                        : 'text-white hover:opacity-90'
                        }`}
                >
                    {isAdding ? 'Adicionado!' : 'Adicionar'}
                </button>
            </div>
        </div>
    );
}
