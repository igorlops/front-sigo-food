'use client';

import { createContext, useContext, useEffect, useReducer, useMemo, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// ---
// ## Definição de Tipos
// ---

interface UserData {
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  token: string | null;
}

type AuthAction =
  | { type: 'LOGIN'; payload: { token: string; user: UserData } }
  | { type: 'LOGOUT' }
  | { type: 'SET_AUTH_STATUS'; payload: { isAuthenticated: boolean; user?: UserData | null; token?: string | null } };

interface AuthContextData {
  isAuthenticated: boolean;
  user: UserData | null;
  token: string | null;
  setLogin: (token: string, name: string, email: string) => void;
  setLogout: () => void;
}

// ---
// ## Reducer
// ---

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('userName', action.payload.user.name);
      localStorage.setItem('userEmail', action.payload.user.email);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'SET_AUTH_STATUS':
      // Garante que o objeto user seja criado apenas se for fornecido ou se já existir e for válido.
      const newUser = action.payload.user !== undefined ? action.payload.user : state.user;
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: newUser,
        token: action.payload.token !== undefined ? action.payload.token : state.token,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

// ---
// ## AuthProvider
// ---

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('userName') && !!localStorage.getItem('userEmail') : false,
    user: typeof window !== 'undefined' && localStorage.getItem('userName') && localStorage.getItem('userEmail')
      ? {
          name: localStorage.getItem('userName') as string,
          email: localStorage.getItem('userEmail') as string,
        }
      : null,
    token: null,
  });

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    const authenticatedFromStorage = !!storedName && !!storedEmail;

    // Constrói um objeto user temporário a partir do localStorage para comparação
    const userFromStorage: UserData | null = authenticatedFromStorage
      ? { name: storedName as string, email: storedEmail as string }
      : null;

    // Flags para controlar se precisamos fazer dispatch
    let needsUpdate = false;
    let newIsAuthenticated = state.isAuthenticated;
    let newUser = state.user;
    let newToken = state.token;

    // 1. Verificar isAuthenticated
    if (state.isAuthenticated !== authenticatedFromStorage) {
      needsUpdate = true;
      newIsAuthenticated = authenticatedFromStorage;
    }

    // 2. Verificar user data
    // Evita JSON.stringify para comparação de objetos se o estado for null
    if (state.user === null && userFromStorage !== null) {
        needsUpdate = true;
        newUser = userFromStorage;
    } else if (state.user !== null && userFromStorage === null) {
        needsUpdate = true;
        newUser = null;
    } else if (state.user !== null && userFromStorage !== null) {
        if (state.user.name !== userFromStorage.name || state.user.email !== userFromStorage.email) {
            needsUpdate = true;
            newUser = userFromStorage;
        }
    }

    // 3. Verificar token (se o usuário está autenticado pelo storage mas o token está ausente no estado)
    if (authenticatedFromStorage && !state.token && pathname !== '/login') {
      // Isso indica que a página foi recarregada e o token em memória foi perdido.
      // Aqui você precisaria de uma lógica para *reobter* o token, talvez de um cookie HttpOnly
      // ou fazendo uma requisição de revalidação de sessão.
      // Por enquanto, não faremos dispatch APENAS por isso, pois isso pode levar ao loop
      // se não houver um mecanismo para 'preecher' o token.
      // O redirecionamento já acontece abaixo se não houver autenticação pelo storage.
    }

    // Apenas despacha se houver alguma mudança real detectada
    if (needsUpdate) {
      dispatch({
        type: 'SET_AUTH_STATUS',
        payload: {
          isAuthenticated: newIsAuthenticated,
          user: newUser,
          token: newToken, // Mantém o token existente no estado, ou null
        },
      });
    }

    // Redireciona para login se não autenticado (baseado em nome/email)
    // e não estiver na página de login.
    if (!authenticatedFromStorage && pathname !== '/login') {
      router.push('/login');
    }
  }, [state.isAuthenticated, state.user, state.token, pathname, router]);


  const setLogin = (token: string, name: string, email: string) => {
    const user: UserData = { name, email };
    dispatch({ type: 'LOGIN', payload: { token, user } });
    router.push('/dashboard');
  };

  const setLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
  };

  const memoizedContextValue = useMemo(() => {
    return {
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      token: state.token,
      setLogin,
      setLogout,
    };
  }, [state.isAuthenticated, state.user, state.token]);

  return (
    <AuthContext.Provider value={memoizedContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// ---
// ## useAuth Hook
// ---

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};