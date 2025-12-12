'use client'
import { ApiService } from "./ApiService";

interface responseDataPagination {
    data: DataEstoquePagination;
}
// Define a estrutura do retorno do serviço
interface DataEstoquePagination {
    data: EstoquesPaginados;
    message: string;
    error: boolean;
}
export interface EstoquesPaginados {
    data: Array<Estoque>;
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
    data: DataEstoque;
}
interface responseDataDelete {
    data: {
        data: null,
        error: boolean,
        message: string
    }
}
export interface Estoque {
    id: number;
    product_id: number;
    quantity: number;
    observation: string;
    type: string;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataEstoque {
    data: Array<Estoque>; // Agora sabemos que o array contém objetos do tipo Estoque
    message: string;
    error: boolean;
}
export interface dataResponseShowEstoque {
    data: {
        data: Array<ShowEstoque>
    };
    error: boolean;
    message: string;
}
export interface ShowEstoque {
    product_id: number;
    product_name: string;
    quantity: number;
    observation: string;
    type: string;
    created_at: Date;
    updated_at: Date;
}


export async function buscaEstoques(): Promise<dataResponseShowEstoque | null> {
    try {
        const response = await ApiService;
        return response.get('/stocks');
    } catch (error) {
        console.error('Erro ao buscar estoque:', error);
        return null;
    }
}

export async function adicionaEstoque(product_id: number | null, quantity: number | null, type: string | null, observation: string | null): Promise<{ data: DataEstoque } | null> {
    try {
        const response = await ApiService;
        return response.post('/stocks', JSON.stringify({ product_id, quantity, type, observation }));

    } catch (error) {
        console.error('Erro ao adicionar estoque:', error);
        return null;
    }
}

export async function buscaEstoque(stock_id: number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/stocks/' + stock_id);
    } catch (error) {
        console.error('Erro ao buscar estoque:', error);
        return null;
    }
}
export async function buscaEstoquePorProduto(product_id: number | null): Promise<responseDataPagination | null> {
    try {
        const response = await ApiService;
        return response.get('/stocks/product/' + product_id);
    } catch (error) {
        console.error('Erro ao buscar estoque:', error);
        return null;
    }
}

export async function atualizaEstoque(stock_id: number, formData: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put('/stocks/' + stock_id, formData);

    } catch (error) {
        console.error('Erro ao atualizar estoque: ', error);
        return null;
    }
}
export async function deletaEstoque(stock_id: number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete('/stocks/' + stock_id);

    } catch (error) {
        console.error('Erro ao deletar estoque: ', error);
        return null;
    }
}
