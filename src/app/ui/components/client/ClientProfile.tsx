'use client';

import React, { useState, useEffect } from 'react';

// Interface simulada de usuário (depois pode vir de um contexto de Auth)
interface UserProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export default function ClientProfile() {
    const [user, setUser] = useState<UserProfile>({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Carregar dados (mock do localStorage por enquanto)
    useEffect(() => {
        const storedUser = localStorage.getItem('sigo_user_profile');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsLoading(true);
        // Simula salvamento
        setTimeout(() => {
            localStorage.setItem('sigo_user_profile', JSON.stringify(user));
            setIsEditing(false);
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 p-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Meu Perfil</h2>
                    <p className="text-gray-500 mt-1">Gerencie suas informações pessoais</p>
                </div>
                <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl shadow-inner text-blue-500">
                    👤
                </div>
            </div>

            <div className="p-8 space-y-8">
                {/* Dados Pessoais */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                            Dados Pessoais
                        </h3>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                style={{ color: 'var(--color-primary, #2563eb)' }}
                                className="text-sm font-semibold hover:underline"
                            >
                                Editar
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-4 focus:ring-blue-100 outline-none
                                    ${isEditing
                                        ? 'border-gray-300 bg-white focus:border-blue-500'
                                        : 'border-transparent bg-gray-50 text-gray-600'
                                    }`}
                                placeholder="Seu nome"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Telefone / WhatsApp</label>
                            <input
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-4 focus:ring-blue-100 outline-none
                                    ${isEditing
                                        ? 'border-gray-300 bg-white focus:border-blue-500'
                                        : 'border-transparent bg-gray-50 text-gray-600'
                                    }`}
                                placeholder="(00) 00000-0000"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-4 focus:ring-blue-100 outline-none
                                    ${isEditing
                                        ? 'border-gray-300 bg-white focus:border-blue-500'
                                        : 'border-transparent bg-gray-50 text-gray-600'
                                    }`}
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100" />

                {/* Endereço */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                        <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
                        Endereço de Entrega Principal
                    </h3>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Endereço Completo</label>
                        <textarea
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            rows={3}
                            className={`w-full px-4 py-3 rounded-xl border transition-all resize-none focus:ring-4 focus:ring-blue-100 outline-none
                                ${isEditing
                                    ? 'border-gray-300 bg-white focus:border-blue-500'
                                    : 'border-transparent bg-gray-50 text-gray-600'
                                }`}
                            placeholder="Rua, Número, Bairro, Complemento"
                        />
                    </div>
                </section>

                {isEditing && (
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            onClick={() => setIsEditing(false)}
                            disabled={isLoading}
                            className="px-6 py-3 rounded-xl text-gray-600 font-bold hover:bg-gray-100 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            style={{ backgroundColor: 'var(--color-primary, #2563eb)' }}
                            className="px-8 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Salvando...
                                </>
                            ) : (
                                'Salvar Alterações'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
