'use client'
import { ApiService } from "./ApiService";

// Define a estrutura de uma categoria

interface responseData {
    data: DataPedido;
}

export interface Pedido {
    id: number;
    value: number,
    number_of_installments: number,
    id_payment: number,
    id_client: number
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataPedido {
    data: Array<Pedido>; // Agora sabemos que o array contém objetos do tipo Pedido
    message: string;
    error: boolean;
}

export async function buscaPedidos(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/orders');
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        return null;
    }
}
