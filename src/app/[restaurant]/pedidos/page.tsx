import OrderHistory from '@/app/ui/components/client/OrderHistory';
import { Suspense } from 'react';

export default function PedidosPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Suspense fallback={<div>Carregando histórico...</div>}>
                <OrderHistory />
            </Suspense>
        </div>
    );
}
