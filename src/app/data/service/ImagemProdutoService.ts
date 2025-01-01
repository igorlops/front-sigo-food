'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataImagemProduto;
}

export interface ImagemProduto {
    id: number;
    image_name: string;
    id_product: number;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataImagemProduto {
    data: Array<ImagemProduto>; // Agora sabemos que o array contém objetos do tipo ImageProduto
    message: string;
    error: boolean;
}

export async function buscaImagemProdutos(productID:number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/image-product/product/'+productID);
    } catch (error) {
        console.error('Erro ao buscar imagem de produtos:', error);
        return null;
    }
}
