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
        message:string
    }
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

export async function buscaEstoques(): Promise<responseDataPagination | null> {
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

export async function buscaEstoque(stock_id:number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/products/'+stock_id);
    } catch (error) {
        console.error('Erro ao buscar estoque:', error);
        return null;
    }
}

export async function atualizaEstoque(stock_id:number,formData:FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put('/products/'+stock_id,formData);

    } catch (error) {
        console.error('Erro ao atualizar estoque: ', error);
        return null;
    }
}
export async function deletaEstoque(stock_id:number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete('/products/'+stock_id);

    } catch (error) {
        console.error('Erro ao deletar estoque: ', error);
        return null;
    }
}
