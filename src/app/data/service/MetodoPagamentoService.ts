'use client'
import { ApiService } from "./ApiService";

// Tipos exportados
export interface MetodoPagamento {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface MetodoPagamentoResponse {
    data: MetodoPagamento[];
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

// Services - retornam apenas dados tratados
export async function buscaMetodoPagamentos(): Promise<MetodoPagamento[]> {
    const { data } = await ApiService.get('/payments-methods');
    return data.data;
}

export async function adicionaMetodoPagamento(formData: FormData): Promise<MetodoPagamentoResponse> {
    const { data } = await ApiService.post('/payments-methods', formData);
    return data;
}

export async function buscaMetodoPagamento(payment_method_id: number): Promise<MetodoPagamento> {
    const { data } = await ApiService.get(`/payments-methods/${payment_method_id}`);
    return data.data[0];
}

export async function atualizaMetodoPagamento(payment_method_id: number, formData: FormData): Promise<MetodoPagamentoResponse> {
    const { data } = await ApiService.put(`/payments-methods/${payment_method_id}`, formData);
    return data;
}

export async function deletaMetodoPagamento(payment_method_id: number): Promise<DeleteResponse> {
    const { data } = await ApiService.delete(`/payments-methods/${payment_method_id}`);
    return data.data;
}
