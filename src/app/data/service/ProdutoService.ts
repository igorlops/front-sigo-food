'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataProduto;
}
interface imagesName {
    image_name: string;
}

export interface Produto {
    id: number;
    name: string;
    category_id: number;
    description: string;
    price: Array<imagesName>;
    status: Array<imagesName>;
    image_path: Array<imagesName>;
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
