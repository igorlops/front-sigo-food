// authService.ts
import { ApiService } from "./ApiService";

export async function login(email: string, password: string) {
  try {
    const response = await ApiService.post('/login', { email, password });
    return response.data;

  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
}
