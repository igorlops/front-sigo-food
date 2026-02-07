import { ApiService } from './ApiService';

export interface PaginatedResponse<T> {
    data: Array<T>;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export const BaseApiService = {
    async getAll<T>(route: string): Promise<Array<T>> {
        const { data } = await ApiService.get(route);
        return data.data;
    },

    async getById<T>(route: string, id: number): Promise<T> {
        const { data } = await ApiService.get(`${route}/${id}`);
        return data.data[0];
    },

    async getPaginated<T>(
        route: string,
        page: number = 1
    ): Promise<PaginatedResponse<T>> {
        const { data } = await ApiService.get(`${route}?paginated=S&page=${page}`);
        return data.data;
    },

    async create<TResponse>(
        route: string,
        payload: unknown
    ): Promise<TResponse> {
        const { data } = await ApiService.post(route, payload);
        return data;
    },

    async update<TResponse>(
        route: string,
        id: number,
        payload: unknown
    ): Promise<TResponse> {
        const { data } = await ApiService.put(`${route}/${id}`, payload);
        return data;
    },

    async remove<TResponse>(
        route: string,
        id: number
    ): Promise<TResponse> {
        const { data } = await ApiService.delete(`${route}/${id}`);
        return data.data;
    },
};
