'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataCategoria;
}

export interface Categoria {
    id: number;
    name: string;
    restaurant_id: number;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataCategoria {
    data: Array<Categoria>; // Agora sabemos que o array contém objetos do tipo Categoria
    message: string;
    error: boolean;
}

export async function buscaCategorias(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/categories');
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        return null;
    }
}

export async function adicionaCategoria(name: string): Promise<{ data: DataCategoria} | null> {
    try {
        const response = await ApiService;
        return response.post('/categories',JSON.stringify({ name }));

    } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
        return null;
    }
}