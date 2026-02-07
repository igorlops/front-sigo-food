'use client'

import { useState, useEffect } from 'react';
import {
    buscaRestaurante,
    buscaMeuRestaurante
} from '../service/RestauranteService';
import { Restaurant } from '../../../../api-types';

/**
 * Hook para buscar um restaurante específico
 * @param restauranteId - ID do restaurante (null para não buscar)
 */
export function useRestaurante(restauranteId: number | null) {
    const [data, setData] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!restauranteId) return;

        async function fetch() {
            try {
                setLoading(true);
                const result = await buscaRestaurante(restauranteId!);
                setData(result);
            } catch {
                setError('Erro ao buscar restaurante');
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [restauranteId]);

    return { data, loading, error };
}

/**
 * Hook para buscar o restaurante do usuário logado
 */
export function useMeuRestaurante() {
    const [data, setData] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetch() {
            try {
                setLoading(true);
                const result = await buscaMeuRestaurante();
                setData(result);
            } catch {
                setError('Erro ao buscar restaurante');
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, []);

    return { data, loading, error };
}
