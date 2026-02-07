'use client'
import { ApiService } from "./ApiService";

// Tipos exportados
export interface ImagemProduto {
    id: number;
    image_name: string;
    image_path: string;
    product_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface ImagemProdutoResponse {
    data: ImagemProduto[];
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

// Services - retornam apenas dados tratados
export async function buscaImagemProdutos(productID: number): Promise<ImagemProduto[]> {
    const { data } = await ApiService.get(`/image-product/product/${productID}`);
    return data.data;
}

export async function adicionaImagemProdutos(formData: FormData): Promise<ImagemProdutoResponse> {
    const { data } = await ApiService.post('/image-product', formData);
    return data;
}

export async function buscaImagemProduto(product_id: number): Promise<ImagemProduto[]> {
    const { data } = await ApiService.get(`/image-product/product/${product_id}`);
    return data.data;
}

export async function atualizaImagemProduto(image_product_id: number, formData: FormData): Promise<ImagemProdutoResponse> {
    const { data } = await ApiService.put(`/image-product/${image_product_id}`, formData);
    return data;
}

export async function deletaImagemProduto(image_product_id: number): Promise<DeleteResponse> {
    const { data } = await ApiService.delete(`/image-product/${image_product_id}`);
    return data.data;
}
