import { getRestaurantInfo } from '@/app/data/service/CardapioService';
import ClientHeader from '@/app/ui/components/client/ClientHeader';
import ClientBottomNav from '@/app/ui/components/client/ClientBottomNav';
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

    const info = await getRestaurantInfo(restaurant);
    const restaurantName = info?.name || decodeURIComponent(restaurant);

    return (
        <ClientProviders restaurantSlug={restaurant}>
            <ThemeWrapper
                primaryColor={info?.primary_color}
                secondaryColor={info?.secondary_color}
            >
                <div className="min-h-screen bg-gray-50 pt-16 pb-20 md:pb-8">
                    <ClientHeader restaurantName={restaurantName} />
                    <main className="w-full">
                        {children}
                    </main>
                    <ClientBottomNav />
                </div>
            </ThemeWrapper>
        </ClientProviders>
    );
}
