'use client'
import { ApiService } from "./ApiService";

interface responseData {
    data: DataImagemProduto;
}
interface responseDataDelete {
    data: {
        data: null,
        error: boolean,
        message: string
    }
}
export interface ImagemProduto {
    id: number;
    image_name: string;
    image_path: string;
    product_id: number;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataImagemProduto {
    data: Array<ImagemProduto>; // Agora sabemos que o array contém objetos do tipo ImageProduto
    message: string;
    error: boolean;
}

export async function buscaImagemProdutos(productID: number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/image-product/product/' + productID);
    } catch (error) {
        console.error('Erro ao buscar imagem de produtos:', error);
        return null;
    }
}

export async function adicionaImagemProdutos(data: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        console.log(data)
        return response.post('/image-product', data);

    } catch (error) {
        console.error('Erro ao adicionar imagem de produto: ', error);
        return null;
    }
}

export async function buscaImagemProduto(product_id: number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/image-product/product/' + product_id);
    } catch (error) {
        console.error('Erro ao buscar imagem de produto:', error);
        return null;
    }
}

export async function atualizaImagemProduto(image_product_id: number, formData: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put('/image-product/' + image_product_id, formData);

    } catch (error) {
        console.error('Erro ao atualizar imagem de produto: ', error);
        return null;
    }
}
export async function deletaImagemProduto(image_product_id: number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete('/image-product/' + image_product_id);

    } catch (error) {
        console.error('Erro ao deletar imagem de produto: ', error);
        return null;
    }
}
