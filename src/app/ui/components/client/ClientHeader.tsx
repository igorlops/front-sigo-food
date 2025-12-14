'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClientHeader({ restaurantName }: { restaurantName: string }) {
    const { items, total } = useCart();
    const pathname = usePathname();

    // Extrai o tenant do pathname para garantir links corretos
    // Formato: /tenant/...
    const tenant = pathname.split('/')[1];

    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
            <div className="max-w-4xl mx-auto px-4 h-full flex items-center justify-between">
                <Link href={`/${tenant}`} style={{ color: 'var(--color-primary, #1e3a8a)' }} className="font-bold text-xl">
                    {restaurantName}
                </Link>

                <div className="flex items-center gap-4">
                    <Link href={`/${tenant}/pedido`}>
                        <span className="text-sm text-gray-600 hover:text-blue-600">Pedido</span>
                    </Link>

                    <Link href={`/${tenant}/perfil`} className="p-2 text-gray-500 hover:text-blue-600 transition-colors" title="Meu Perfil">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </Link>

                    <Link
                        href={`/${tenant}/carrinho`}
                        className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </div>
                        <span className="font-medium text-blue-900 text-sm hidden sm:block">
                            R$ {total.toFixed(2)}
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
