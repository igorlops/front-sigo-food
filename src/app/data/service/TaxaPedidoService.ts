'use client'
import { ApiService } from "./ApiService";
import {
    OrderFee,
    OrderFeesListResponse,
    OrderFeesPaginatedResponse,
    OrderFeeShowResponse,
    OrderFeeCreateResponse,
    OrderFeeUpdateResponse,
    OrderFeeDeleteResponse
} from '../../../../api-types';

// Re-export OrderFee type for use in components
export type { OrderFee };

// Interfaces de resposta para paginação
interface responseDataPagination {
    data: DataTaxaPagination;
}

interface DataTaxaPagination {
    data: TaxasPaginadas;
    message: string;
    error: boolean;
}

export interface TaxasPaginadas {
    data: Array<OrderFee>;
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// Interface de resposta padrão
interface responseData {
    data: DataTaxa;
}

interface DataTaxa {
    data: Array<OrderFee>;
    message: string;
    error: boolean;
}

// Interface de resposta para delete
interface responseDataDelete {
    data: {
        data: null;
        error: boolean;
        message: string;
    }
}

/**
 * Busca todas as taxas de pedido (sem paginação)
 */
export async function buscaTaxas(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/fees');
    } catch (error) {
        console.error('Erro ao buscar taxas:', error);
        return null;
    }
}

/**
 * Busca taxas com paginação
 * @param page - Número da página (padrão: 1)
 */
export async function buscaTaxasPaginadas(page: number = 1): Promise<responseDataPagination | null> {
    try {
        const response = await ApiService;
        return response.get(`/fees?paginated=S&page=${page}`);
    } catch (error) {
        console.error('Erro ao buscar taxas paginadas:', error);
        return null;
    }
}

/**
 * Busca uma taxa específica por ID
 * @param fee_id - ID da taxa
 */
export async function buscaTaxa(fee_id: number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get(`/fees/${fee_id}`);
    } catch (error) {
        console.error('Erro ao buscar taxa:', error);
        return null;
    }
}

/**
 * Adiciona uma nova taxa de pedido
 * @param formData - Dados da taxa (type, desc, unit_price)
 */
export async function adicionaTaxa(formData: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.post('/fees', formData);
    } catch (error) {
        console.error('Erro ao adicionar taxa:', error);
        return null;
    }
}

/**
 * Atualiza uma taxa existente
 * @param fee_id - ID da taxa
 * @param formData - Dados atualizados da taxa
 */
export async function atualizaTaxa(fee_id: number, formData: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put(`/fees/${fee_id}`, formData);
    } catch (error) {
        console.error('Erro ao atualizar taxa:', error);
        return null;
    }
}

/**
 * Deleta uma taxa
 * @param fee_id - ID da taxa
 */
export async function deletaTaxa(fee_id: number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete(`/fees/${fee_id}`);
    } catch (error) {
        console.error('Erro ao deletar taxa:', error);
        return null;
    }
}
