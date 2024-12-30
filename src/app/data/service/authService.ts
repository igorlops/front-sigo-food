import { ApiService } from "./ApiService";

interface dataToken {
    token: string
}

interface dataLoginDefault {
    data: dataToken | null;
    message: string;
    error: boolean;
}

export async function login(email: string, password: string): Promise<{ data: dataLoginDefault} | null> {
    try {
        const response = await ApiService;
        return response.post('/login',JSON.stringify({ email, password }));

    } catch (error) {
        console.error('Erro no login:', error);
        return null;
    }
}
export const AuthService = {
    isAuthenticated: () => {
        const token = localStorage.getItem('authToken');
        return !!token; // Retorna true se o token existir
    },

    getToken: () => {
        return localStorage.getItem('authToken');
    },

    setToken: (token:string) => {
        localStorage.setItem('authToken', token);
    },

    removeToken: () => {
        localStorage.removeItem('authToken');
    }
};
