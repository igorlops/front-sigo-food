'use client'
import { ApiService } from "./ApiService";

interface responseDataPagination {
    data: DataUsuarioPagination;
}
// Define a estrutura do retorno do serviço
interface DataUsuarioPagination {
    data: UsuariosPaginados;
    message: string;
    error: boolean;
}
export interface UsuariosPaginados {
    data: Array<Usuario>;
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
    data: DataUsuario;
}
interface responseDataDelete {
    data: {
        data: null,
        error: boolean,
        message: string
    }
}
export interface Usuario {
    id: number;
    name: string;
    email: string;
    restaurant_id: number;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataUsuario {
    data: Array<Usuario>; // Agora sabemos que o array contém objetos do tipo Usuario
    message: string;
    error: boolean;
}

export async function buscaUsuarios(current_page: number): Promise<responseDataPagination | null> {
    try {
        const response = await ApiService;
        return response.get('/users?page=' + current_page);
    } catch (error) {
        console.error('Erro ao buscar Usuarios:', error);
        return null;
    }
}

export async function adicionaUsuario(data: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        console.log(data)
        return response.post('/users', data);

    } catch (error) {
        console.error('Erro ao adicionar usuário: ', error);
        return null;
    }
}

export async function buscaUsuario(user_id: number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/users/' + user_id);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
}

export async function atualizaUsuario(user_id: number, formData: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put('/users/' + user_id, formData);

    } catch (error) {
        console.error('Erro ao atualizar usuário: ', error);
        return null;
    }
}
export async function deletaUsuario(user_id: number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete('/users/' + user_id);

    } catch (error) {
        console.error('Erro ao deletar usuário: ', error);
        return null;
    }
}
