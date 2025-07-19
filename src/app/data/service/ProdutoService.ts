'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataProduto;
}

interface ProdutosParaInserirProps {
    name: string | null;
    category_id: number | null;
    restaurant_id: number | null;
    description: string | null;
    price: string | null;
    status: string | null;
    image_path: File | null;
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

// Define a estrutura do retorno do serviço
interface DataProduto {
    data: Array<Produto>;
    message: string;
    error: boolean;
}


export async function buscaProdutos(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/products');
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
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

export async function adicionaProdutos({name,category_id,description,price,status,image_path, restaurant_id}:ProdutosParaInserirProps): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.post('/products',{ name,category_id,description,price,status,image_path , restaurant_id});

    } catch (error) {
        console.error('Erro ao adicionar produto: ', error);
        return null;
    }
}
export async function atualizaProduto(product_id:number,{name,category_id,description,price,status,image_path}:ProdutosParaInserirProps): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put('/products/'+product_id,{ name,category_id,description,price,status,image_path});

    } catch (error) {
        console.error('Erro ao adicionar produto: ', error);
        return null;
    }
}
export async function deletaProduto(product_id:number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.delete('/products/'+product_id);

    } catch (error) {
        console.error('Erro ao adicionar produto: ', error);
        return null;
    }
}
