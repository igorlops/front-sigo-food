'use client'
import { ApiService } from "./ApiService";

interface responseDataPagination {
    data: DataProdutoPagination;
}
// Define a estrutura do retorno do serviço
interface DataProdutoPagination {
    data: ProdutosPaginados;
    message: string;
    error: boolean;
}
export interface ProdutosPaginados {
    data: Array<Cliente>;
    current_page: number;
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: Array<{
        url: string | null,
        label: string,
        active: boolean
    }>
    next_page_url: string | null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
    total: number
}
interface responseData {
    data: DataCliente;
}
interface responseDataDelete {
    data: {
        data: null,
        error: boolean,
        message:string
    }
}
export interface Cliente {
    id: number;
    restaurant_id: string;
    name: string;
    email: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataCliente {
    data: Array<Cliente>; // Agora sabemos que o array contém objetos do tipo Cliente
    message: string;
    error: boolean;
}

export async function buscaClientes(): Promise<responseDataPagination | null> {
    try {
        const response = await ApiService;
        return response.get('/clients');
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        return null;
    }
}

export async function adicionaCliente(first_name: string,last_name: string,cpf: string,date_of_birth: string,telefone: string,email: string): Promise<{ data: DataCliente} | null> {
    try {
        const response = await ApiService;
        return response.post('/clients',JSON.stringify({ first_name,last_name,cpf,date_of_birth,telefone,email }));

    } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        return null;
    }
}

export async function buscaCliente(client_id:number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/clients/'+client_id);
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        return null;
    }
}

export async function atualizaCliente(client_id:number,formData:FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put('/clients/'+client_id,formData);

    } catch (error) {
        console.error('Erro ao atualizar cliente: ', error);
        return null;
    }
}
export async function deletaCliente(client_id:number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete('/clients/'+client_id);

    } catch (error) {
        console.error('Erro ao deletar cliente: ', error);
        return null;
    }
}
