'use client'
import { ApiService } from "./ApiService";

interface responseDataPagination {
    data: DataPedidoPagination;
}
// Define a estrutura do retorno do serviço
interface DataPedidoPagination {
    data: PedidosPaginados;
    message: string;
    error: boolean;
}
export interface PedidosPaginados {
    data: Array<Pedido>;
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
interface responseData {
    data: DataPedido;
}
interface responseDataDelete {
    data: {
        data: null,
        error: boolean,
        message: string
    }
}
export interface Pedido {
    id: number;
    restaurant_id: number;
    client_id: number;
    client_name: number;
    payment_method_id: number;
    payment_method_desc: string;
    status: number;
    order_type: number;
    delivery_fee: number;
    total_value: number;
    delivery_address: number;
    product: {
        id: string;
        name: string;
        price: string;
    }
    created_at: Date;
    updated_at: Date;
}

// Define a estrutura do retorno do serviço
interface DataPedido {
    data: Array<Pedido>; // Agora sabemos que o array contém objetos do tipo Pedido
    message: string;
    error: boolean;
}

export async function buscaPedidos(current_page: number): Promise<responseDataPagination | null> {
    try {
        const response = await ApiService;
        return response.get('/orders?page=' + current_page);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        return null;
    }
}

export async function adicionaPedido(data: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        console.log(data)
        return response.post('/orders', data);

    } catch (error) {
        console.error('Erro ao adicionar pedido: ', error);
        return null;
    }
}

export async function buscaPedido(order_id: number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/orders/' + order_id);
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        return null;
    }
}

export async function atualizaPedido(order_id: number, formData: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put('/orders/' + order_id, formData);

    } catch (error) {
        console.error('Erro ao atualizar pedido: ', error);
        return null;
    }
}
export async function deletaPedido(order_id: number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete('/orders/' + order_id);

    } catch (error) {
        console.error('Erro ao deletar pedido: ', error);
        return null;
    }
}

