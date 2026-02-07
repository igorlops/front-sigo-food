'use client'
import { ApiService } from "./ApiService";

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

interface ApiResponse<T> {
    data: T;
    message: string;
    error: boolean;
}

export async function listarMesas(): Promise<ApiResponse<Mesa[]> | null> {
    try {
        const response = await ApiService;
        const res = await response.get('/tables');
        return res.data;
    } catch (error) {
        console.error('Erro ao listar mesas:', error);
        return null;
    }
}

export async function buscarDashboardMesas(): Promise<ApiResponse<DashboardResponse> | null> {
    try {
        const response = await ApiService;
        const res = await response.get('/tables/dashboard');
        return res.data;
    } catch (error) {
        console.error('Erro ao buscar dashboard de mesas:', error);
        return null;
    }
}

export async function verDetalhesMesa(id: number): Promise<ApiResponse<Mesa> | null> {
    try {
        const response = await ApiService;
        const res = await response.get(`/tables/${id}`);
        return res.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes da mesa:', error);
        return null;
    }
}

export async function ocuparMesa(id: number, numberOfPeople: number): Promise<any> {
    try {
        const response = await ApiService;
        const res = await response.post(`/tables/${id}/occupy`, {
            number_of_people: numberOfPeople
        });
        return res.data;
    } catch (error) {
        console.error('Erro ao ocupar mesa:', error);
        return null;
    }
}

export async function liberarMesa(id: number): Promise<any> {
    try {
        const response = await ApiService;
        const res = await response.post(`/tables/${id}/release`);
        return res.data;
    } catch (error) {
        console.error('Erro ao liberar mesa:', error);
        return null;
    }
}

export async function alterarStatusMesa(id: number, status: string, additionalData: any = {}): Promise<any> {
    try {
        const response = await ApiService;
        const res = await response.post(`/tables/${id}/change-status`, {
            status,
            ...additionalData
        });
        return res.data;
    } catch (error) {
        console.error('Erro ao alterar status da mesa:', error);
        return null;
    }
}

export async function fecharSessaoMesa(sessionId: number, paymentMethodId: number, notes?: string): Promise<any> {
    try {
        const response = await ApiService;
        const res = await response.post(`/table-sessions/${sessionId}/close`, {
            payment_method_id: paymentMethodId,
            notes
        });
        return res.data;
    } catch (error) {
        console.error('Erro ao fechar sessão:', error);
        return null;
    }
}

export interface CriarMesaData {
    table_number: string;
    capacity: number;
    location: string;
}

export async function adicionarMesa(data: CriarMesaData): Promise<ApiResponse<Mesa> | null> {
    try {
        const response = await ApiService;
        const res = await response.post('/tables', data);
        return res.data;
    } catch (error) {
        console.error('Erro ao adicionar mesa:', error);
        return null;
    }
}
