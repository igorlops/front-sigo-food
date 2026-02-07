'use client'
import { ApiService } from "./ApiService";

// Tipos exportados
export interface Pedido {
    id: number;
    restaurant_id: number;
    client_id: number;
    client_name: number;
    payment_method_id: number;
    payment_method_desc: string;
    status: number;
    status_name: string;
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

export interface PedidosPaginados {
    data: Array<Pedido>;
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface PedidoResponse {
    data: Pedido[];
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

// Services - retornam apenas dados tratados
export async function buscaPedidos(current_page: number): Promise<PedidosPaginados> {
    const { data } = await ApiService.get(`/orders?page=${current_page}`);
    return data.data;
}

export async function adicionaPedido(pedidoData: FormData | any): Promise<PedidoResponse> {
    const { data } = await ApiService.post('/orders', pedidoData);
    return data;
}

export async function buscaPedido(order_id: number): Promise<Pedido> {
    const { data } = await ApiService.get(`/orders/${order_id}`);
    return data.data[0];
}

export async function atualizaPedido(order_id: number, formData: FormData): Promise<PedidoResponse> {
    const { data } = await ApiService.put(`/orders/${order_id}`, formData);
    return data;
}

export async function deletaPedido(order_id: number): Promise<DeleteResponse> {
    const { data } = await ApiService.delete(`/orders/${order_id}`);
    return data.data;
}

export async function buscaPedidosPorEmail(email: string): Promise<Pedido[]> {
    const { data } = await ApiService.get(`/orders/history?email=${email}`);
    return data.data;
}
