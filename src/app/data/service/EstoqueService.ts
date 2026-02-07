'use client'
import { ApiService } from "./ApiService";

// Tipos exportados
export interface Estoque {
    id: number;
    product_id: number;
    quantity: number;
    observation: string;
    type: string;
    created_at: Date;
    updated_at: Date;
}

export interface ShowEstoque {
    product_id: number;
    product_name: string;
    quantity: number;
    observation: string;
    type: string;
    created_at: Date;
    updated_at: Date;
}

export interface EstoquesPaginados {
    data: Array<Estoque>;
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

export interface EstoqueResponse {
    data: Estoque[];
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

// Services - retornam apenas dados tratados
export async function buscaEstoques(): Promise<ShowEstoque[]> {
    const { data } = await ApiService.get('/stocks');
    return data.data;
}

export async function adicionaEstoque(product_id: number | null, quantity: number | null, type: string | null, observation: string | null): Promise<EstoqueResponse> {
    const { data } = await ApiService.post('/stocks', JSON.stringify({ product_id, quantity, type, observation }));
    return data;
}

export async function buscaEstoque(stock_id: number): Promise<Estoque> {
    const { data } = await ApiService.get(`/stocks/${stock_id}`);
    return data.data[0];
}

export async function buscaEstoquePorProduto(product_id: number | null): Promise<EstoquesPaginados> {
    const { data } = await ApiService.get(`/stocks/product/${product_id}`);
    return data.data;
}

export async function atualizaEstoque(stock_id: number, formData: FormData): Promise<EstoqueResponse> {
    const { data } = await ApiService.put(`/stocks/${stock_id}`, formData);
    return data;
}

export async function deletaEstoque(stock_id: number): Promise<DeleteResponse> {
    const { data } = await ApiService.delete(`/stocks/${stock_id}`);
    return data.data;
}
