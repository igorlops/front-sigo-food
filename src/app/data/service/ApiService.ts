"use client"
import axios from 'axios';
import Cookies from 'js-cookie'

export const WebService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export const ApiService = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar o token CSRF em todas as requisições do ApiService
ApiService.interceptors.request.use((config) => {
    // O Laravel Sanctum envia o cookie XSRF-TOKEN após o GET /sanctum/csrf-cookie
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (xsrfToken) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

// Interceptor do WebService também precisa do CSRF para o login
WebService.interceptors.request.use((config) => {
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    if (xsrfToken) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
    }
    return config;
});

ApiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 419) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        return Promise.reject(error);
    }
);
