'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextData {
    isAuthenticated: boolean;
    setAuthenticated: (authenticated: boolean) => void;
    setLogin: (token: string) => void;
    setLogout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname(); // Usando o hook correto para obter o pathname

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setAuthenticated(!!token);

        // Redireciona para login se não autenticado
        if (!token && pathname !== '/login') {
            router.push('/login');
        }
    }, [router, pathname]);

    const setLogin = (token: string) => {
        localStorage.setItem('authToken', token);
        setAuthenticated(true);
        router.push('/dashboard');
    };

    const setLogout = () => {
        localStorage.removeItem('authToken');
        setAuthenticated(false);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, setLogin, setLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
