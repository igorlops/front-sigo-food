import CartView from '@/app/ui/components/client/CartView';

export default function CarrinhoPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Carrinho de Compras</h1>
            <CartView />
        </div>
    );
}
