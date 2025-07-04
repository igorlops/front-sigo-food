"use client";

import { useAuth } from "../context/AuthContext";

export function useAuthUtils() {
  const context = useAuth();

  const isAuthenticated = () => !!context.token;

  const getToken = () => context.token;

  const removeToken = () => context.setLogout();

  return {
    isAuthenticated,
    getToken,
    removeToken,
    user: context.user,
    token: context.token,
  };
}
