'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataStatus;
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

export async function adicionaStatus(name: string): Promise<{ data: DataStatus} | null> {
    try {
        const response = await ApiService;
        return response.post('/status',JSON.stringify({ name }), {
            headers: {
            'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Erro ao adicionar status:', error);
        return null;
    }
}