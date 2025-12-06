'use client'
import { ApiService } from "./ApiService";

interface responseData {
    data: DataStatus;
}
interface responseDataDelete {
    data: {
        data: null,
        error: boolean,
        message: string
    }
}
export interface Status {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataStatus {
    data: Array<Status>; // Agora sabemos que o array contém objetos do tipo Status
    message: string;
    error: boolean;
}

export async function buscaStatus(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/status');
    } catch (error) {
        console.error('Erro ao buscar status:', error);
        return null;
    }
}

export async function adicionaStatus(name: string): Promise<{ data: DataStatus } | null> {
    try {
        const response = await ApiService;
        return response.post('/status', JSON.stringify({ name }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Erro ao adicionar status:', error);
        return null;
    }
}
export async function detailsStatus(status_id: number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/status/' + status_id);
    } catch (error) {
        console.error('Erro ao buscar status:', error);
        return null;
    }
}

export async function atualizaStatus(status_id: number, formData: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put('/status/' + status_id, formData);

    } catch (error) {
        console.error('Erro ao atualizar status: ', error);
        return null;
    }
}
export async function deletaStatus(status_id: number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete('/status/' + status_id);

    } catch (error) {
        console.error('Erro ao deletar status: ', error);
        return null;
    }
}
