import axios from 'axios';
import { AuthService } from './authService';

export const ApiService = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

ApiService.interceptors.request.use((config) => {
    const token = AuthService.getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

ApiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token inválido ou expirado
            AuthService.removeToken();
            window.location.href = '/login'; // Redireciona para a página de login
        }
        return Promise.reject(error);
    }
);
