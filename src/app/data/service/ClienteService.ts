'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataCliente;
}

export interface Cliente {
    id: number;
    first_name: string;
    last_name: string;
    cpf: string;
    date_of_birth: Date;
    telefone: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataCliente {
    data: Array<Cliente>; // Agora sabemos que o array contém objetos do tipo Cliente
    message: string;
    error: boolean;
}

export async function buscaClientes(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/clients');
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        return null;
    }
}

export async function adicionaCliente(first_name: string,last_name: string,cpf: string,date_of_birth: Date,telefone: string,email: string): Promise<{ data: DataCliente} | null> {
    try {
        const response = await ApiService;
        return response.post('/clients',JSON.stringify({ first_name,last_name,cpf,date_of_birth,telefone,email }));

    } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        return null;
    }
}
