'use client'
import { ApiService } from "./ApiService";

// Tipos exportados
export interface Cliente {
    id: number;
    restaurant_id: string;
    name: string;
    email: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
}

export interface ClientesPaginados {
    data: Array<Cliente>;
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

export interface ClienteResponse {
    data: Cliente[];
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

export interface IdentificarClienteResponse {
    client_id: number;
    masked_email?: string;
    message?: string;
}

// Services - retornam apenas dados tratados
export async function buscaClientes(): Promise<ClientesPaginados> {
    const { data } = await ApiService.get('/clients');
    return data.data;
}

export async function adicionaCliente(formData: FormData): Promise<ClienteResponse> {
    const { data } = await ApiService.post('/clients', formData);
    return data;
}

export async function buscaCliente(client_id: number): Promise<Cliente> {
    const { data } = await ApiService.get(`/clients/${client_id}`);
    return data.data[0];
}

export async function atualizaCliente(client_id: number, formData: FormData): Promise<ClienteResponse> {
    const { data } = await ApiService.put(`/clients/${client_id}`, formData);
    return data;
}

export async function deletaCliente(client_id: number): Promise<DeleteResponse> {
    const { data } = await ApiService.delete(`/clients/${client_id}`);
    return data.data;
}

export async function identificaCliente(identifier: string, restaurant_id: string): Promise<IdentificarClienteResponse> {
    const { data } = await ApiService.post('/clients/identify', { identifier, restaurant_id });
    return data;
}

export async function verificaOtpCliente(client_id: number, restaurant_id: string, otp: string): Promise<Cliente> {
    const { data } = await ApiService.post('/clients/verify-otp', { client_id, restaurant_id, otp });
    return data.data;
}
