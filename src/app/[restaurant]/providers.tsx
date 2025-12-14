'use client';

import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";

export function ClientProviders({ children, restaurantSlug }: { children: React.ReactNode; restaurantSlug: string }) {
    return (
        <CartProvider restaurantSlug={restaurantSlug}>
            <OrderProvider>
                {children}
            </OrderProvider>
        </CartProvider>
    );
}
