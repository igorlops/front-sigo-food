'use client'
import { ApiService } from "./ApiService";
import { OrderFee } from '../../../../api-types';

// Re-export OrderFee type
export type { OrderFee };

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

export interface TaxaResponse {
    data: OrderFee[];
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

// Services - retornam apenas dados tratados
export async function buscaTaxas(): Promise<OrderFee[]> {
    const { data } = await ApiService.get('/fees');
    return data.data;
}

export async function buscaTaxasPaginadas(page: number = 1): Promise<TaxasPaginadas> {
    const { data } = await ApiService.get(`/fees?paginated=S&page=${page}`);
    return data.data;
}

export async function buscaTaxa(fee_id: number): Promise<OrderFee> {
    const { data } = await ApiService.get(`/fees/${fee_id}`);
    return data.data[0];
}

export async function adicionaTaxa(formData: FormData): Promise<TaxaResponse> {
    const { data } = await ApiService.post('/fees', formData);
    return data;
}

export async function atualizaTaxa(fee_id: number, formData: FormData): Promise<TaxaResponse> {
    const { data } = await ApiService.put(`/fees/${fee_id}`, formData);
    return data;
}

export async function deletaTaxa(fee_id: number): Promise<DeleteResponse> {
    const { data } = await ApiService.delete(`/fees/${fee_id}`);
    return data.data;
}
