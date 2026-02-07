// authService.ts
import { ApiService, WebService } from "./ApiService";

export interface LoginResponse {
  data: any;
  message: string;
  error: boolean;
}

// Service - retorna apenas dados tratados
export async function login(email: string, password: string): Promise<LoginResponse> {
  await WebService.get('/sanctum/csrf-cookie');
  const { data } = await ApiService.post('/login', { email, password });
  return data;
}
