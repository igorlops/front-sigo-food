'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type OrderType = 'delivery' | 'pickup' | null;

interface OrderContextData {
    orderType: OrderType;
    setOrderType: (type: OrderType) => void;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orderType, setOrderType] = useState<OrderType>(null);

    return (
        <OrderContext.Provider value={{ orderType, setOrderType }}>
            {children}
        </OrderContext.Provider>
    );
}

export const useOrder = () => useContext(OrderContext);
