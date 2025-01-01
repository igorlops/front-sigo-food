'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataMetodoPagamento;
}

export interface MetodoPagamento {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataMetodoPagamento {
    data: Array<MetodoPagamento>; // Agora sabemos que o array contém objetos do tipo MetodoPagamento
    message: string;
    error: boolean;
}

export async function buscaMetodoPagamentos(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/payments-methods');
    } catch (error) {
        console.error('Erro ao buscar MetodoPagamentos:', error);
        return null;
    }
}
