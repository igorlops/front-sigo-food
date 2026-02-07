'use client'
import { ApiService } from "./ApiService";

// Tipos exportados
export interface Mesa {
    id: number;
    table_number: string;
    capacity: number;
    location: string;
    status: 'free' | 'occupied' | 'reserved' | 'bill_requested';
    qr_code?: string;
    current_session?: MesaSession;
    since?: string;
    total?: number;
}

export interface MesaSession {
    id: number;
    table_id: number;
    client_id?: number;
    started_at: string;
    ended_at?: string;
    total_amount: number;
    status: 'active' | 'bill_requested' | 'closed';
    orders?: MesaOrderItem[];
}

export interface MesaOrderItem {
    id: number;
    product_id: number;
    product?: {
        id: number;
        name: string;
        price: number;
    };
    quantity: number;
    unit_price: number;
    subtotal: number;
    status: string;
}

export interface DashboardStats {
    total_tables: number;
    free_tables: number;
    occupied_tables: number;
    bill_requested_tables: number;
    reserved_tables: number;
    total_open_amount: number;
}

export interface DashboardResponse {
    summary: DashboardStats;
    tables: Mesa[];
}

export interface CriarMesaData {
    table_number: string;
    capacity: number;
    location: string;
}

export interface MesaResponse {
    data: Mesa | Mesa[];
    message: string;
    error: boolean;
}

// Services - retornam apenas dados tratados
export async function listarMesas(): Promise<Mesa[]> {
    const { data } = await ApiService.get('/tables');
    return data.data;
}

export async function buscarDashboardMesas(): Promise<DashboardResponse> {
    const { data } = await ApiService.get('/tables/dashboard');
    return data.data;
}

export async function verDetalhesMesa(id: number): Promise<Mesa> {
    const { data } = await ApiService.get(`/tables/${id}`);
    return data.data;
}

export async function ocuparMesa(id: number, numberOfPeople: number): Promise<any> {
    const { data } = await ApiService.post(`/tables/${id}/occupy`, {
        number_of_people: numberOfPeople
    });
    return data;
}

export async function liberarMesa(id: number): Promise<any> {
    const { data } = await ApiService.post(`/tables/${id}/release`);
    return data;
}

export async function alterarStatusMesa(id: number, status: string, additionalData: any = {}): Promise<any> {
    const { data } = await ApiService.post(`/tables/${id}/change-status`, {
        status,
        ...additionalData
    });
    return data;
}

export async function fecharSessaoMesa(sessionId: number, paymentMethodId: number, notes?: string): Promise<any> {
    const { data } = await ApiService.post(`/table-sessions/${sessionId}/close`, {
        payment_method_id: paymentMethodId,
        notes
    });
    return data;
}

export async function adicionarMesa(mesaData: CriarMesaData): Promise<Mesa> {
    const { data } = await ApiService.post('/tables', mesaData);
    return data.data;
}
