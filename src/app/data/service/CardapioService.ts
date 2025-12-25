import { Produto } from "./ProdutoService";
import { ApiService } from "./ApiService";

export interface CategoriaCardapio {
    id: number;
    name: string;
    products: Produto[];
}

export interface RestauranteInfo {
    id: number;
    name: string;
    slug: string;
    logo_path?: string;
    banner_path?: string;
    description?: string;
    address?: string;
    phone?: string;
    whatsapp?: string;
    opening_hours?: string;
    primary_color?: string;
    secondary_color?: string;
}

interface CardapioApiResponse {
    error: boolean;
    data: CategoriaCardapio[];
    message: string;
}
const API_URL = 'http://localhost:8000/api';

export async function getCardapio(slug: string): Promise<CardapioApiResponse | null> {
    try {
        const response = await fetch(`${API_URL}/products/restaurant/${slug}`, {
            cache: 'no-store', // Ensure fresh data
        });

        if (!response.ok) {
            console.error('Erro na resposta da API:', response.status, response.statusText);
            return null;
        }

        const data: CardapioApiResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        return null;
    }
}

export async function getRestaurantInfo(slug: string): Promise<RestauranteInfo | null> {
    try {
        const response = await fetch(`${API_URL}/restaurants/${slug}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error('Erro na resposta da API:', response.status, response.statusText);
            return null;
        }

        // Adjusting return type if needed, assuming API returns the object directly or wrapped.
        // Based on CardapioService usage, let's assume standard response, 
        // but typically it might be wrapped in { data: ... }. 
        // Let's stick to returning what fetch parses, but typed.
        // Use 'any' temporarily if structure is unknown, but Interface implies direct object or wrapped?
        // Let's assume standard wrapper { data: RestauranteInfo } or direct.
        // Given Cardapio response is wrapped, likely RestaurantInfo is too?
        // The original code was: return response.get(...) which returns AxiosResponse.
        // AxiosResponse.data is the body.
        // So we need to return the body.

        const data = await response.json();
        // If the API wraps it in 'data', we might need to access it.
        // But for getCardapio we defined CardapioApiResponse which INCLUDES 'data'.
        // For RestauranteInfo, the interface is just the fields.
        // If the API returns { data: RestauranteInfo }, we should probably unwrap it if the caller expects just RestauranteInfo.
        // Original code: return response.get(...) -> returns Promise<AxiosResponse<RestauranteInfo>> implicitely?
        // Actually CardapioService.ts didn't explicitly unwrap .data in the old code shown?
        // Wait, axios response.get(...) returns the RESPONSE object. 
        // If the caller expects just the data, they usually do response.data.
        // But the previous code was `return response.get(...)`.
        // Let's look at `page.tsx`: 
        // `const cardapio = await getCardapio(restaurant);`
        // `if (!cardapio || cardapio.data.length === 0)`
        // So `cardapio` IS the response body (wrapper).

        return data;

    } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
        return null;
    }
}
