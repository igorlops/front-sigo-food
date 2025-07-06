'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataProduto;
}

interface ProdutosParaInserirProps {
    name: string | null;
    category_id: number | null;
    description: string | null;
    price: string | null;
    status: string | null;
    image_path: File | null;
}

export interface Produto {
    id: number;
    name: string;
    category_id: number;
    description: string;
    price: string;
    status: string;
    image_path: string;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataProduto {
    data: Array<Produto>; // Agora sabemos que o array contém objetos do tipo Produto
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

export async function adicionaProdutos({name,category_id,description,price,status,image_path}:ProdutosParaInserirProps): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.post('/products',JSON.stringify({ name,category_id,description,price,status,image_path }));

    } catch (error) {
        console.error('Erro ao adicionar produto: ', error);
        return null;
    }
}
