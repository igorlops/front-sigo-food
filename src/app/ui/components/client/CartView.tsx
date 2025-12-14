'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useOrder } from '@/context/OrderContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CartView() {
    const { items, removeFromCart, updateQuantity, subtotal, total, clearCart } = useCart();
    const { orderType } = useOrder();
    const pathname = usePathname();
    const tenant = pathname.split('/')[1];

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-700 mb-2">Seu carrinho está vazio</h2>
                <p className="text-gray-500 mb-6">Adicione itens deliciosos para continuar.</p>
                <Link
                    href={`/${tenant}/produtos`}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                    Ver Cardápio
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Seu Pedido</h2>
                <button
                    onClick={clearCart}
                    className="text-red-500 text-sm hover:underline"
                >
                    Limpar carrinho
                </button>
            </div>

            <div className="divide-y divide-gray-100">
                {items.map((item) => (
                    <div key={item.product.id} className="p-4 flex gap-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            {item.product.image_path ? (
                                <img
                                    src={item.product.image_path}
                                    alt={item.product.name || 'Produto'}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                                    Sem imagem
                                </div>
                            )}
                        </div>

                        <div className="flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3 className="line-clamp-1">{item.product.name}</h3>
                                <p className="ml-4">
                                    R$ {((parseFloat(item.product.price?.toString() || '0') * item.quantity)).toFixed(2)}
                                </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.product.description}</p>

                            <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center border rounded-lg bg-gray-50">
                                    <button
                                        className="px-3 py-1 hover:bg-gray-200 text-gray-600 rounded-l-lg"
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="px-2 font-medium text-gray-800">{item.quantity}</span>
                                    <button
                                        className="px-3 py-1 hover:bg-gray-200 text-gray-600 rounded-r-lg"
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="font-medium text-red-600 hover:text-red-500"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>R$ {subtotal.toFixed(2)}</p>
                </div>

                {orderType && (
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <p>Tipo de Entrega</p>
                        <p className="uppercase">{orderType === 'pickup' ? 'Retirada' : 'Delivery'}</p>
                    </div>
                )}

                <div className="flex justify-between text-lg font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
                    <p>Total</p>
                    <p>R$ {total.toFixed(2)}</p>
                </div>

                <div className="mt-6">
                    <button
                        className="w-full flex justify-center items-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                    >
                        Finalizar Pedido
                    </button>
                </div>

                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                        ou{' '}
                        <Link href={`/${tenant}/produtos`} className="font-medium text-blue-600 hover:text-blue-500">
                            Continuar Comprando
                            <span aria-hidden="true"> &rarr;</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
