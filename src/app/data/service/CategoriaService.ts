'use client'
import { ApiService } from "./ApiService";

// Tipos exportados
export interface Categoria {
    id: number;
    name: string;
    restaurant_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface CategoriasPaginadas {
    data: Array<Categoria>;
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

export interface CategoriaResponse {
    data: Categoria[];
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

// Services - retornam apenas dados tratados
export async function buscaCategorias(): Promise<Categoria[]> {
    const { data } = await ApiService.get('/categories');
    return data.data;
}

export async function buscaCategoriasPaginadas(page: number = 1): Promise<CategoriasPaginadas> {
    const { data } = await ApiService.get(`/categories?paginated=S&page=${page}`);
    return data.data;
}

export async function buscaCategoria(category_id: number): Promise<Categoria> {
    const { data } = await ApiService.get(`/categories/${category_id}`);
    return data.data[0];
}

export async function adicionaCategoria(name: string, restaurant_id: number): Promise<CategoriaResponse> {
    const { data } = await ApiService.post('/categories', JSON.stringify({ name, restaurant_id }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return data;
}

export async function atualizaCategoria(category_id: number, formData: FormData): Promise<CategoriaResponse> {
    const { data } = await ApiService.put(`/categories/${category_id}`, formData);
    return data;
}

export async function deletaCategoria(category_id: number): Promise<DeleteResponse> {
    const { data } = await ApiService.delete(`/categories/${category_id}`);
    return data.data;
}
