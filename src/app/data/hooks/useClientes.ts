'use client'

import { useState, useEffect } from 'react';
import {
    buscaClientes,
    buscaCliente,
    Cliente,
    ClientesPaginados
} from '../service/ClienteService';

/**
 * Hook para buscar todos os clientes
 */
export function useClientes() {
    const [data, setData] = useState<ClientesPaginados | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetch() {
            try {
                setLoading(true);
                const result = await buscaClientes();
                setData(result);
            } catch {
                setError('Erro ao buscar clientes');
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, []);

    return { data, loading, error };
}

/**
 * Hook para buscar um cliente específico
 * @param clienteId - ID do cliente (null para não buscar)
 */
export function useCliente(clienteId: number | null) {
    const [data, setData] = useState<Cliente | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!clienteId) return;

        async function fetch() {
            try {
                setLoading(true);
                const result = await buscaCliente(clienteId!);
                setData(result);
            } catch {
                setError('Erro ao buscar cliente');
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [clienteId]);

    return { data, loading, error };
}
