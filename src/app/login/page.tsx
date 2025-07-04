'use client';

import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { login } from "@/app/data/service/authService";
import { useAuth } from "../data/context/AuthContext";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpa mensagens de erro anteriores
    setLoading(true)
    try {        
      const response = await login(email, password);
        console.log("Erro encontrado:")
        console.log(response?.data.error)
        console.log(response?.data.data)
        if(!response?.data.error) {
          let data = response?.data.data;
          let token = data?.token;
          setLogin(token || '', data?.user.name || '', data?.user.email || '');

          // router.push('/dashboard')
          setLoading(false)
        }
        else {
        }
    } catch (error) {
      console.error("Erro ao fazer login: ",error)   
    }
    
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <Box
        className="p-8 bg-white rounded-lg shadow-md w-full max-w-md"
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        onSubmit={handleLogin}
        noValidate
        autoComplete="off"
      >
        <Typography
          variant="h5"
          className="text-gray-800 font-bold text-center mb-4"
        >
          Bem-vindo ao sistema
        </Typography>

        {error && (
          <Typography variant="body2" color="error" className="text-center">
            {error}
          </Typography>
        )}

        <TextField
          id="email"
          label="E-mail"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          id="password"
          label="Senha"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4"
          loading={loading}
          loadingPosition="center"
          disabled={loading}
        >
          Entrar
        </Button>
        <Typography
          variant="body2"
          className="text-gray-600 text-center mt-4"
        >
          Esqueceu sua senha? <a href="/reset" className="text-blue-500">Clique aqui</a>
        </Typography>
      </Box>
    </div>
  );
}
