'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataEstoque;
}

export interface Estoque {
    id: number; 
    id_product: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataEstoque {
    data: Array<Estoque>; // Agora sabemos que o array contém objetos do tipo Estoque
    message: string;
    error: boolean;
}

export async function buscaEstoques(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/stocks');
    } catch (error) {
        console.error('Erro ao buscar estoque:', error);
        return null;
    }
}

export async function adicionaEstoque(id_product: number | null,quantity: number | null): Promise<{ data: DataEstoque} | null> {
    try {
        const response = await ApiService;
        return response.post('/stocks',JSON.stringify({ id_product, quantity }));

    } catch (error) {
        console.error('Erro ao adicionar estoque:', error);
        return null;
    }
}