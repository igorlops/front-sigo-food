import { Produto } from "./ProdutoService";

const API_BASE_URL = 'http://127.0.0.1:8000/api';

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

export async function getCardapio(slug: string): Promise<CategoriaCardapio[] | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/product/restaurant/${slug}`, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) return null;

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar cardápio:', error);
        return null;
    }
}

export async function getRestaurantInfo(slug: string): Promise<RestauranteInfo | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/restaurants/${slug}`, {
            next: { revalidate: 60 },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error('Erro ao buscar info: Status', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar info do restaurante:', error);
        return null;
    }
}
