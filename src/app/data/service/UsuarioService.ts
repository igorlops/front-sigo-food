'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataUsuario;
}

export interface Usuario {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataUsuario {
    data: Array<Usuario>; // Agora sabemos que o array contém objetos do tipo Usuario
    message: string;
    error: boolean;
}

export async function buscaUsuarios(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/users');
    } catch (error) {
        console.error('Erro ao buscar Usuarios:', error);
        return null;
    }
}
