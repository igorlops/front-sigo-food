'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataMetodoPagamento;
}
interface responseDataDelete {
    data: {
        data: null,
        error: boolean,
        message:string
    }
}
export interface MetodoPagamento {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataMetodoPagamento {
    data: Array<MetodoPagamento>; // Agora sabemos que o array contém objetos do tipo MetodoPagamento
    message: string;
    error: boolean;
}

export async function buscaMetodoPagamentos(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/payments-methods');
    } catch (error) {
        console.error('Erro ao buscar Metodo de Pagamentos:', error);
        return null;
    }
}

export async function adicionaMetodoPagamento(data:FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        console.log(data)
        return response.post('/payments-methods',data);

    } catch (error) {
        console.error('Erro ao adicionar método de pagamento: ', error);
        return null;
    }
}

export async function buscaMetodoPagamento(payment_method_id:number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/payments-methods/'+payment_method_id);
    } catch (error) {
        console.error('Erro ao buscar método de pagamento:', error);
        return null;
    }
}

export async function atualizaMetodoPagamento(payment_method_id:number,formData:FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put('/payments-methods/'+payment_method_id,formData);

    } catch (error) {
        console.error('Erro ao atualizar método de pagamento: ', error);
        return null;
    }
}
export async function deletaMetodoPagamento(payment_method_id:number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete('/payments-methods/'+payment_method_id);

    } catch (error) {
        console.error('Erro ao deletar método de pagamento: ', error);
        return null;
    }
}
