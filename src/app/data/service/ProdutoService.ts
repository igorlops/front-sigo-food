'use client'

import { ApiService } from "./ApiService";

// Tipos exportados
export interface Produto {
    id: number;
    name: string | null;
    restaurant_id: number | null;
    category_id: number | null;
    status_id: number | null;
    description: string | null;
    price: string | null;
    image_path: string;
    status: { id: number, description: string };
    category: { id: number, name: string };
    imageProduct: Array<{ id: number, product_id: number, image_path: string }>;
    created_at: Date;
    updated_at: Date;
}

export interface ProdutosPaginados {
    data: Array<Produto>;
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

export interface ProdutoResponse {
    data: Produto[];
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

// Services - retornam apenas dados tratados
export async function buscaProdutos(page: number = 1): Promise<ProdutosPaginados> {
    const { data } = await ApiService.get(`/products?page=${page}`);
    return data.data;
}

export async function adicionaProdutos(formData: FormData): Promise<ProdutoResponse> {
    const { data } = await ApiService.post('/products', formData);
    return data;
}

export async function buscaProduto(product_id: number): Promise<Produto> {
    const { data } = await ApiService.get(`/products/${product_id}`);
    return data.data[0];
}

export async function atualizaProduto(product_id: number, formData: FormData): Promise<ProdutoResponse> {
    const { data } = await ApiService.put(`/products/${product_id}`, formData);
    return data;
}

export async function deletaProduto(product_id: number): Promise<DeleteResponse> {
    const { data } = await ApiService.delete(`/products/${product_id}`);
    return data.data;
}
