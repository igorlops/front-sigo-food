'use client'

import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

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
    data: Array<Produto>;
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

interface responseDataDelete {
    data: {
        data: null,
        error: boolean,
        message:string
    }
}
interface responseData {
    data: DataProduto;
}
// Define a estrutura do retorno do serviço
interface DataProduto {
    data: Array<Produto>;
    message: string;
    error: boolean;
}
export interface Produto {
    id: number;
    name: string | null;
    restaurant_id: number | null;
    category_id: number | null;
    description: string | null;
    price: string | null;
    status: string | null;
    category: {id:number, name:string};
    image_path: string | null;
    created_at: Date;
    updated_at: Date;
}



export async function buscaProdutos( page:number ): Promise<responseDataPagination | null> {
    try {
        const response = await ApiService;
        return response.get('/products?page='+page);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return null;
    }
}

export async function adicionaProdutos(data:FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        console.log(data)
        return response.post('/products',data);

    } catch (error) {
        console.error('Erro ao adicionar produto: ', error);
        return null;
    }
}

export async function buscaProduto(product_id:number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/products/'+product_id);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return null;
    }
}

export async function atualizaProduto(product_id:number,formData:FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put('/products/'+product_id,formData);

    } catch (error) {
        console.error('Erro ao atualizar produto: ', error);
        return null;
    }
}
export async function deletaProduto(product_id:number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete('/products/'+product_id);

    } catch (error) {
        console.error('Erro ao deletar produto: ', error);
        return null;
    }
}
