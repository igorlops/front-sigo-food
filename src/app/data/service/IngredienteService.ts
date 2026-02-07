'use client'
import { ApiService } from "./ApiService";
import { Ingredient } from '../../../../api-types';

// Re-export Ingredient type
export type { Ingredient };

export interface IngredientesPaginados {
    data: Array<Ingredient>;
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

export interface IngredienteResponse {
    data: Ingredient[];
    message: string;
    error: boolean;
}

export interface DeleteResponse {
    data: null;
    error: boolean;
    message: string;
}

// Services - retornam apenas dados tratados
export async function buscaIngredientes(): Promise<Ingredient[]> {
    const { data } = await ApiService.get('/ingredients');
    return data.data;
}

export async function buscaIngredientesPaginados(page: number = 1): Promise<IngredientesPaginados> {
    const { data } = await ApiService.get(`/ingredients?paginated=S&page=${page}`);
    return data.data;
}

export async function buscaIngrediente(ingredient_id: number): Promise<Ingredient> {
    const { data } = await ApiService.get(`/ingredients/${ingredient_id}`);
    return data.data[0];
}

export async function adicionaIngrediente(formData: FormData): Promise<IngredienteResponse> {
    const { data } = await ApiService.post('/ingredients', formData);
    return data;
}

export async function atualizaIngrediente(ingredient_id: number, formData: FormData): Promise<IngredienteResponse> {
    const { data } = await ApiService.put(`/ingredients/${ingredient_id}`, formData);
    return data;
}

export async function deletaIngrediente(ingredient_id: number): Promise<DeleteResponse> {
    const { data } = await ApiService.delete(`/ingredients/${ingredient_id}`);
    return data.data;
}
