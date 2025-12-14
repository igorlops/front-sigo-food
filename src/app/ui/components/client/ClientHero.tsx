'use client';

import React from 'react';
import { RestauranteInfo } from '@/app/data/service/CardapioService';

export default function ClientHero({ info }: { info: RestauranteInfo }) {
    // Fallback banner se não tiver
    const bannerStyle = info.banner_path
        ? { backgroundImage: `url(${info.banner_path})` }
        : { backgroundColor: 'var(--color-primary, #1e3a8a)' }; // Cor de fundo padrão ou tema

    return (
        <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
            {/* Banner Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={bannerStyle}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div> {/* Gradient para melhor leitura */}
            </div>

            {/* Conteúdo Centralizado */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                {info.logo_path && (
                    <div className="bg-white p-1 rounded-full shadow-lg mb-4">
                        <img
                            src={info.logo_path}
                            alt={`${info.name} Logo`}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
                        />
                    </div>
                )}

                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
                    {info.name}
                </h1>

                {info.description && (
                    <p className="text-white/90 text-sm md:text-lg max-w-2xl font-light">
                        {info.description}
                    </p>
                )}

                <div className="absolute bottom-6 animate-bounce">
                    <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
