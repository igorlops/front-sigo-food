'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ProfileRedirect() {
    const router = useRouter();
    const params = useParams();
    const restaurantSlug = params.restaurant as string;

    useEffect(() => {
        // Redireciona para /edit onde a lógica de verificar login reside
        router.replace(`/perfil/edit`);
    }, [router, restaurantSlug]);

    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}
