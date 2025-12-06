"use client"
import axios from 'axios';
import Cookies from 'js-cookie'

export const WebService = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});
export const ApiService = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

ApiService.interceptors.request.use((config) => {
    // O Laravel sempre salva esse cookie como 'XSRF-TOKEN' (não httpOnly)
    const tokenCookie = Cookies.get('XSRF-TOKEN');
    const token = localStorage.getItem('token');

    if (tokenCookie) {
        // Precisamos decodificar porque às vezes vem com encoding de URL
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(tokenCookie);
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

ApiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 419) {
            localStorage.removeItem('user');
            // Opcional: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);