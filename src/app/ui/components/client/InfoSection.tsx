'use client';

import React from 'react';
import { RestauranteInfo } from '@/app/data/service/CardapioService';

export default function InfoSection({ info }: { info: RestauranteInfo }) {
    if (!info.address && !info.phone && !info.opening_hours) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Endereço */}
            {info.address && (
                <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-red-50 p-4 rounded-full mb-4 text-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 text-lg">Localização</h3>
                    <p className="text-gray-600 text-center leading-relaxed max-w-xs">{info.address}</p>
                </div>
            )}

            {/* Horário */}
            {info.opening_hours && (
                <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-green-50 p-4 rounded-full mb-4 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 text-lg">Funcionamento</h3>
                    <p className="text-gray-600 text-center whitespace-pre-line leading-relaxed">{info.opening_hours}</p>
                </div>
            )}

            {/* Contato */}
            {(info.phone || info.whatsapp) && (
                <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="bg-blue-50 p-4 rounded-full mb-4 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 text-lg">Fale Conosco</h3>
                    <div className="space-y-2 text-center">
                        {info.whatsapp && (
                            <a
                                href={`https://wa.me/${info.whatsapp.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 flex items-center justify-center gap-2 hover:text-green-600 transition-colors"
                            >
                                <span className="font-bold">WhatsApp:</span> {info.whatsapp}
                            </a>
                        )}
                        {info.phone && (
                            <a href={`tel:${info.phone}`} className="text-gray-600 flex items-center justify-center gap-2 hover:text-blue-600 transition-colors">
                                <span className="font-bold">Tel:</span> {info.phone}
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
