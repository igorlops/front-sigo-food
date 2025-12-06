// authService.ts
import { ApiService, WebService } from "./ApiService";

export async function login(email: string, password: string) {
  try {
    await WebService.get('/sanctum/csrf-cookie');
    const response = await ApiService.post('/login', { email, password });
    return response.data;

  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
}
