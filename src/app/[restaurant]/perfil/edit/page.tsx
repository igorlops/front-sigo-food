'use client';

import React, { useEffect, useState } from 'react';
import ProfileEditForm from '@/app/ui/components/client/auth/ProfileEditForm';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { User, LogIn } from 'lucide-react';

export default function EditPage() {
    const params = useParams();
    const [hasUser, setHasUser] = useState<boolean | null>(null);
    const restaurantSlug = params.restaurant as string;

    useEffect(() => {
        const user = localStorage.getItem('sigo_user_profile');
        setHasUser(!!user);
    }, []);

    if (hasUser === null) {
        return <div className="min-h-[50vh] flex items-center justify-center">Carregando...</div>;
    }

    if (!hasUser) {
        return (
            <div className="max-w-md mx-auto px-4 py-12 pb-20 text-center">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                        <User size={40} />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Você não está logado</h2>
                    <p className="text-gray-500 mb-8">
                        Para acessar e editar seu perfil, faça login ou crie sua conta agora mesmo.
                    </p>

                    <div className="space-y-3">
                        <Link
                            href={`/perfil/login`}
                            className="block w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            Fazer Login
                        </Link>

                        <Link
                            href={`/perfil/create`}
                            className="block w-full bg-white text-blue-600 font-bold py-3.5 rounded-xl border-2 border-blue-100 hover:bg-blue-50 transition-colors"
                        >
                            Criar Conta
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 pb-20">
            <ProfileEditForm />
        </div>
    );
}
