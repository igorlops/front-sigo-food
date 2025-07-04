import { ApiService } from "./ApiService";

export async function login(email: string, password: string) {
    try {
        return ApiService.post('/login',JSON.stringify({ email, password }));

    } catch (error) {
        console.error('Erro no login:', error);
        return null;
    }
}

