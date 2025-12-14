import { getRestaurantInfo } from '@/app/data/service/CardapioService';
import ClientHeader from '@/app/ui/components/client/ClientHeader';
import { ClientProviders } from './providers';
import ThemeWrapper from '@/app/ui/components/client/ThemeWrapper';

export default async function RestaurantLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ restaurant: string }>
}) {
    const { restaurant } = await params;

    // Recupera informações do restaurante (nome, tema, etc)
    const info = await getRestaurantInfo(restaurant);
    const restaurantName = info?.name || decodeURIComponent(restaurant);

    return (
        <ClientProviders restaurantSlug={restaurant}>
            <ThemeWrapper
                primaryColor={info?.primary_color}
                secondaryColor={info?.secondary_color}
            >
                <div className="min-h-screen bg-gray-50 pb-20 pt-16">
                    <ClientHeader restaurantName={restaurantName} />
                    <main className="w-full">
                        {children}
                    </main>
                </div>
            </ThemeWrapper>
        </ClientProviders>
    );
}
