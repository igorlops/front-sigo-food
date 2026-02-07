'use client'
import { ApiService } from "./ApiService";

// Tipos exportados
export interface Usuario {
    id: number;
    name: string;
    email: string;
    restaurant_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface UsuariosPaginados {
    data: Array<Usuario>;
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

export interface UsuarioResponse {
    data: Usuario[];
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

// Services - retornam apenas dados tratados
export async function buscaUsuarios(current_page: number): Promise<UsuariosPaginados> {
    const { data } = await ApiService.get(`/users?page=${current_page}`);
    return data.data;
}

export async function adicionaUsuario(formData: FormData): Promise<UsuarioResponse> {
    const { data } = await ApiService.post('/users', formData);
    return data;
}

export async function buscaUsuario(user_id: number): Promise<Usuario> {
    const { data } = await ApiService.get(`/users/${user_id}`);
    return data.data[0];
}

export async function atualizaUsuario(user_id: number, formData: FormData): Promise<UsuarioResponse> {
    const { data } = await ApiService.put(`/users/${user_id}`, formData);
    return data;
}

export async function deletaUsuario(user_id: number): Promise<DeleteResponse> {
    const { data } = await ApiService.delete(`/users/${user_id}`);
    return data.data;
}
