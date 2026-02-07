'use client'

import { useState, useEffect } from 'react';
import {
    buscaPedidos,
    buscaPedido,
    buscaPedidosPorEmail,
    Pedido,
    PedidosPaginados
} from '../service/PedidoService';

/**
 * Hook para buscar pedidos paginados
 * @param page - Número da página atual
 */
export function usePedidos(page: number = 1) {
    const [data, setData] = useState<PedidosPaginados | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetch() {
            try {
                setLoading(true);
                const result = await buscaPedidos(page);
                setData(result);
            } catch {
                setError('Erro ao buscar pedidos');
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [page]);

    return { data, loading, error };
}

/**
 * Hook para buscar um pedido específico
 * @param pedidoId - ID do pedido (null para não buscar)
 */
export function usePedido(pedidoId: number | null) {
    const [data, setData] = useState<Pedido | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!pedidoId) return;

        async function fetch() {
            try {
                setLoading(true);
                const result = await buscaPedido(pedidoId!);
                setData(result);
            } catch {
                setError('Erro ao buscar pedido');
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [pedidoId]);

    return { data, loading, error };
}

/**
 * Hook para buscar pedidos por email
 * @param email - Email do cliente (null para não buscar)
 */
export function usePedidosPorEmail(email: string | null) {
    const [data, setData] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!email) return;

        async function fetch() {
            try {
                setLoading(true);
                const result = await buscaPedidosPorEmail(email);
                setData(result);
            } catch {
                setError('Erro ao buscar histórico de pedidos');
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [email]);

    return { data, loading, error };
}
