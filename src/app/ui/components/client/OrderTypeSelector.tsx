'use client';

import React from 'react';
import { useOrder, OrderType } from '@/context/OrderContext';
import { useRouter, usePathname } from 'next/navigation';

export default function OrderTypeSelector() {
    const { orderType, setOrderType } = useOrder();
    const router = useRouter();
    const pathname = usePathname();
    const tenant = pathname.split('/')[1];

    const handleSelect = (type: OrderType) => {
        setOrderType(type);
    };

    const handleContinue = () => {
        if (orderType) {
            router.push(`/${tenant}/produtos`);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Como você deseja receber seu pedido?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <button
                    onClick={() => handleSelect('delivery')}
                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-4 h-48
                        ${orderType === 'delivery'
                            ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                >
                    <div className={`p-4 rounded-full ${orderType === 'delivery' ? 'bg-blue-200' : 'bg-gray-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            {/* Icone Moto/Delivery simples */}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg text-gray-700">Entrega (Delivery)</span>
                    <p className="text-sm text-gray-500">Vamos levar até você</p>
                </button>

                <button
                    onClick={() => handleSelect('pickup')}
                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-4 h-48
                        ${orderType === 'pickup'
                            ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-200'
                            : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                        }`}
                >
                    <div className={`p-4 rounded-full ${orderType === 'pickup' ? 'bg-orange-200' : 'bg-gray-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg text-gray-700">Retirada no Balcão</span>
                    <p className="text-sm text-gray-500">Você busca no restaurante</p>
                </button>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={handleContinue}
                    disabled={!orderType}
                    className={`px-8 py-3 rounded-lg font-bold text-white transition-colors w-full md:w-auto
                        ${orderType ? 'bg-green-600 hover:bg-green-700 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}
                    `}
                >
                    Continuar para o Cardápio
                </button>
            </div>
        </div>
    );
}
