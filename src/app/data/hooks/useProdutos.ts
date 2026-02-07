'use client'

import { useState, useEffect } from 'react';
import {
    buscaProdutos,
    buscaProduto,
    Produto,
    ProdutosPaginados
} from '../service/ProdutoService';

/**
 * Hook para buscar produtos paginados
 * @param page - Número da página atual
 */
export function useProdutos(page: number = 1) {
    const [data, setData] = useState<ProdutosPaginados | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetch() {
            try {
                setLoading(true);
                const result = await buscaProdutos(page);
                setData(result);
            } catch {
                setError('Erro ao buscar produtos');
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [page]);

    return { data, loading, error };
}

/**
 * Hook para buscar um produto específico
 * @param produtoId - ID do produto (null para não buscar)
 */
export function useProduto(produtoId: number | null) {
    const [data, setData] = useState<Produto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!produtoId) return;

        async function fetch() {
            try {
                setLoading(true);
                const result = await buscaProduto(produtoId!);
                setData(result);
            } catch {
                setError('Erro ao buscar produto');
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [produtoId]);

    return { data, loading, error };
}
