'use client'
import { ApiService } from "./ApiService";
import { Restaurant } from '../../../../api-types';

// Tipos exportados
export interface RestauranteResponse {
    data: Restaurant;
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

// Services - retornam apenas dados tratados

/**
 * Busca informações de um restaurante específico
 * @param restaurant_id - ID do restaurante
 */
export async function buscaRestaurante(restaurant_id: number): Promise<Restaurant> {
    const { data } = await ApiService.get(`/restaurants/${restaurant_id}`);
    return data.data;
}

/**
 * Atualiza informações do restaurante
 * @param restaurant_id - ID do restaurante
 * @param formData - Dados atualizados
 */
export async function atualizaRestaurante(restaurant_id: number, formData: FormData): Promise<RestauranteResponse> {
    const { data } = await ApiService.put(`/restaurants/${restaurant_id}`, formData);
    return data;
}

/**
 * Busca o restaurante do usuário logado (baseado no token)
 */
export async function buscaMeuRestaurante(): Promise<Restaurant> {
    const { data } = await ApiService.get('/restaurants/me');
    return data.data;
}
