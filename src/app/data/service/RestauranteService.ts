'use client'
import { ApiService } from "./ApiService";
import {
    Restaurant
} from '../../../../api-types';

// Interface de resposta padrão
interface responseData {
    data: DataRestaurante;
}

interface DataRestaurante {
    data: Restaurant;
    message: string;
    error: boolean;
}

// Interface de resposta para delete
interface responseDataDelete {
    data: {
        data: null;
        error: boolean;
        message: string;
    }
}

/**
 * Busca informações de um restaurante específico
 * @param restaurant_id - ID do restaurante
 */
export async function buscaRestaurante(restaurant_id: number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get(`/restaurants/${restaurant_id}`);
    } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        return null;
    }
}

/**
 * Atualiza informações do restaurante
 * @param restaurant_id - ID do restaurante
 * @param formData - Dados atualizados (name, contact_email, phone, kitchen_type, slug, logo_path, primary_color, secondary_color)
 */
export async function atualizaRestaurante(restaurant_id: number, formData: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put(`/restaurants/${restaurant_id}`, formData);
    } catch (error) {
        console.error('Erro ao atualizar restaurante:', error);
        return null;
    }
}

/**
 * Busca o restaurante do usuário logado (baseado no token)
 */
export async function buscaMeuRestaurante(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/restaurants/me');
    } catch (error) {
        console.error('Erro ao buscar meu restaurante:', error);
        return null;
    }
}
