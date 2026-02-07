'use client'
import { ApiService } from "./ApiService";

// Tipos exportados
export interface Status {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface StatusResponse {
    data: Status[];
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

// Services - retornam apenas dados tratados
export async function buscaStatus(): Promise<Status[]> {
    const { data } = await ApiService.get('/status');
    return data.data;
}

export async function adicionaStatus(name: string): Promise<StatusResponse> {
    const { data } = await ApiService.post('/status', JSON.stringify({ name }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return data;
}

export async function detailsStatus(status_id: number): Promise<Status> {
    const { data } = await ApiService.get(`/status/${status_id}`);
    return data.data[0];
}

export async function atualizaStatus(status_id: number, formData: FormData): Promise<StatusResponse> {
    const { data } = await ApiService.put(`/status/${status_id}`, formData);
    return data;
}

export async function deletaStatus(status_id: number): Promise<DeleteResponse> {
    const { data } = await ApiService.delete(`/status/${status_id}`);
    return data.data;
}
