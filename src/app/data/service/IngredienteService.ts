'use client'
import { ApiService } from "./ApiService";
import {
    Ingredient,
    IngredientsListResponse,
    IngredientsPaginatedResponse,
    IngredientShowResponse,
    IngredientCreateResponse,
    IngredientUpdateResponse,
    IngredientDeleteResponse
} from '../../../../api-types';

// Re-export Ingredient type for use in components
export type { Ingredient };

// Interfaces de resposta para paginação
interface responseDataPagination {
    data: DataIngredientePagination;
}

interface DataIngredientePagination {
    data: IngredientesPaginados;
    message: string;
    error: boolean;
}

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

// Interface de resposta padrão
interface responseData {
    data: DataIngrediente;
}

interface DataIngrediente {
    data: Array<Ingredient>;
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
 * Busca todos os ingredientes (sem paginação)
 */
export async function buscaIngredientes(): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get('/ingredients');
    } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
        return null;
    }
}

/**
 * Busca ingredientes com paginação
 * @param page - Número da página (padrão: 1)
 */
export async function buscaIngredientesPaginados(page: number = 1): Promise<responseDataPagination | null> {
    try {
        const response = await ApiService;
        return response.get(`/ingredients?paginated=S&page=${page}`);
    } catch (error) {
        console.error('Erro ao buscar ingredientes paginados:', error);
        return null;
    }
}

/**
 * Busca um ingrediente específico por ID
 * @param ingredient_id - ID do ingrediente
 */
export async function buscaIngrediente(ingredient_id: number): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.get(`/ingredients/${ingredient_id}`);
    } catch (error) {
        console.error('Erro ao buscar ingrediente:', error);
        return null;
    }
}

/**
 * Adiciona um novo ingrediente
 * @param formData - Dados do ingrediente (name, quantity, unit, min_quantity, observation)
 */
export async function adicionaIngrediente(formData: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.post('/ingredients', formData);
    } catch (error) {
        console.error('Erro ao adicionar ingrediente:', error);
        return null;
    }
}

/**
 * Atualiza um ingrediente existente
 * @param ingredient_id - ID do ingrediente
 * @param formData - Dados atualizados do ingrediente
 */
export async function atualizaIngrediente(ingredient_id: number, formData: FormData): Promise<responseData | null> {
    try {
        const response = await ApiService;
        return response.put(`/ingredients/${ingredient_id}`, formData);
    } catch (error) {
        console.error('Erro ao atualizar ingrediente:', error);
        return null;
    }
}

/**
 * Deleta um ingrediente
 * @param ingredient_id - ID do ingrediente
 */
export async function deletaIngrediente(ingredient_id: number): Promise<responseDataDelete | null> {
    try {
        const response = await ApiService;
        return response.delete(`/ingredients/${ingredient_id}`);
    } catch (error) {
        console.error('Erro ao deletar ingrediente:', error);
        return null;
    }
}
