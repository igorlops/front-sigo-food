import { getCardapio } from '@/app/data/service/CardapioService';
import ProductCard from '@/app/ui/components/client/ProductCard';
import CategoryNav from '@/app/ui/components/client/CategoryNav';

export default async function ProdutosPage({ params }: { params: Promise<{ restaurant: string }> }) {
    const { restaurant } = await params;
    const cardapio = await getCardapio(restaurant);

    if (!cardapio || !cardapio.data || cardapio.data.length === 0) {
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
        <div className="relative">
            <CategoryNav categories={cardapio.data} />

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-12 pb-24">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 mb-8 shadow-sm">
                    <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Cardápio</h1>
                    <p className="text-blue-700">Escolha seus favoritos e monte seu pedido ideal.</p>
                </div>

                {cardapio.data.map((categoria) => (
                    <section
                        key={categoria.id}
                        id={`cat-${categoria.id}`}
                        className="scroll-mt-32"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-blue-600 rounded-full shadow-sm"></span>
                            {categoria.name}
                            <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md ml-2">
                                {categoria.products.length} itens
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categoria.products.map((produto) => (
                                <ProductCard key={produto.id} product={produto} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
