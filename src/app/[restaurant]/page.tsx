import { getRestaurantInfo } from '@/app/data/service/CardapioService';
import ClientHero from '@/app/ui/components/client/ClientHero';
import InfoSection from '@/app/ui/components/client/InfoSection';
import Link from 'next/link';

export default async function RestaurantHome({ params }: { params: Promise<{ restaurant: string }> }) {
    const { restaurant } = await params;
    const info = await getRestaurantInfo(restaurant);

    if (!info) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-4xl">
                    😕
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Restaurante não encontrado</h1>
                <p className="text-gray-600 max-w-md">Não conseguimos localizar as informações deste estabelecimento. Verifique o endereço digitado.</p>
            </div>
        );
    }

    return (
        <div className="pb-16 min-h-screen flex flex-col">
            {/* Hero Section */}
            <ClientHero info={info} />

            {/* Menu de Ações Rápido */}
            <div className="-mt-24 relative z-20 px-4 mb-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-center border border-gray-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Bem-vindo ao {info.name}!</h2>
                    <p className="text-gray-500 mb-8">O que você deseja fazer hoje?</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${restaurant}/pedido`}
                            style={{ backgroundColor: 'var(--color-primary, #dc2626)' }}
                            className="flex-1 group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 active:scale-95"
                        >
                            <span className="mr-3 text-2xl">🛵</span>
                            <span>Fazer Pedido</span>
                        </Link>

                        <Link
                            href={`/${restaurant}/produtos`}
                            style={{
                                color: 'var(--color-primary, #dc2626)',
                                borderColor: 'var(--color-primary, #dc2626)'
                            }}
                            className="flex-1 group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-white border-2 transition-all rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md hover:-translate-y-1 active:scale-95"
                        >
                            <span className="mr-3 text-2xl">📖</span>
                            <span>Ver Cardápio</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Seção de Informações com Design Moderno */}
            <div className="max-w-5xl mx-auto w-full px-4">
                <div className="text-center mb-10">
                    <span className="text-sm font-bold tracking-wider text-gray-400 uppercase">Informações</span>
                    <h3 className="text-3xl font-extrabold text-gray-900 mt-2">Onde estamos</h3>
                    <div className="w-20 h-1 bg-gray-200 mx-auto mt-4 rounded-full"></div>
                </div>
                <InfoSection info={info} />
            </div>

            {/* Footer decorativo simples */}
            <div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-100 pt-8">
                <p>&copy; {new Date().getFullYear()} {info.name}. Todos os direitos reservados.</p>
                <p className="text-xs mt-1">Desenvolvido com SigoFood</p>
            </div>
        </div>
    );
}
