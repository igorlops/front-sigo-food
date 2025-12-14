import OrderTypeSelector from '@/app/ui/components/client/OrderTypeSelector';

export default function PedidoPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto px-4">
            <OrderTypeSelector />
        </div>
    );
}
