'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseDataPagination {
    data: DataCategoriaPagination;
}
// Define a estrutura do retorno do serviço
interface DataCategoriaPagination {
    data: CategoriasPaginadas;
    message: string;
    error: boolean;
}
export interface CategoriasPaginadas {
    data: Array<Categoria>;
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
    data: DataCategoria;
}
interface responseDataDelete {
    data: {
        data: null,
        error: boolean,
        message: string
    }
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
export async function buscaCategoriasPaginadas(page: number = 1): Promise<responseDataPagination | null> {
    try {
        const response = await ApiService;
        return response.get('/categories?paginated=S&page=' + page);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        return null;
    }
}

export async function buscaCategoria(category_id: number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/categories/' + category_id);
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        return null;
    }
}

export async function adicionaCategoria(name: string, restaurant_id: number): Promise<{ data: DataCategoria } | null> {
    try {
        const response = await ApiService;
        return response.post('/categories', JSON.stringify({ name, restaurant_id }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
        return null;
    }
}

export async function atualizaCategoria(category_id: number, formData: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put('/categories/' + category_id, formData);

    } catch (error) {
        console.error('Erro ao atualizar categoria: ', error);
        return null;
    }
}
export async function deletaCategoria(category_id: number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete('/categories/' + category_id);

    } catch (error) {
        console.error('Erro ao deletar categoria: ', error);
        return null;
    }
}
