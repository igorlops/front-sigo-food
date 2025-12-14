import { getCardapio } from '@/app/data/service/CardapioService';
import ProductCard from '@/app/ui/components/client/ProductCard';

export default async function ProdutosPage({ params }: { params: Promise<{ restaurant: string }> }) {
    const { restaurant } = await params;
    const cardapio = await getCardapio(restaurant);

    if (!cardapio || cardapio.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-lg font-medium">Cardápio indisponível no momento.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-10 pb-12">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h1 className="text-2xl font-bold text-blue-900">Cardápio</h1>
                <p className="text-blue-700">Escolha seus produtos e adicione ao carrinho.</p>
            </div>

            {cardapio.map((categoria) => (
                <section key={categoria.id} id={`cat-${categoria.id}`} className="scroll-mt-24">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                        {categoria.name}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoria.products.map((produto) => (
                            <ProductCard key={produto.id} product={produto} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
