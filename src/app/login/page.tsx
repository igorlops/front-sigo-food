'use client';

import { useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  InputAdornment,
  IconButton,
  Paper
} from "@mui/material";
import { 
  Smartphone, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff,
  Loader2 
} from "lucide-react";

import { login } from "@/app/data/service/authService";
import { useAuth } from "../data/context/AuthContext";
import { useRouter } from "next/navigation";

const colors = {
  primaryBlue: '#1e3a8a', // Equivalente ao blue-900
  accentYellow: '#fcd34d', // Equivalente ao amber-300
  stoneText: '#44403c',   // Equivalente ao stone-700
};

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await login(email, password);
      const data = response?.data;
      console.log(data)

      if (!response?.data?.error && data?.token) {
        const token = data.token;
        const user = data.user;

        // Atualiza contexto (caso seu AuthContext use isso)
        setLogin(token, user);

        // Salva no localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setLoading(false);

        // Redirecionar, se quiser:
        router.push('/dashboard');
      } else {
        setError("Credenciais inválidas.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      setError("Erro ao conectar com o servidor.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950 relative overflow-hidden p-4">
      
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>

      <Paper 
        elevation={24}
        className="w-full max-w-md relative z-10 overflow-hidden rounded-2xl bg-white"
        sx={{ borderRadius: '24px' }}
      >
        {/* Cabeçalho */}
        <Box className="bg-stone-50 p-8 pb-6 text-center border-b border-stone-100">
            <div className="flex justify-center items-center gap-2 mb-4">
                <div className="bg-amber-300 p-2 rounded-lg shadow-md">
                    <Smartphone className="text-blue-900 w-6 h-6" />
                </div>
                <Typography variant="h5" className="font-bold tracking-tight text-blue-900">
                    SIGO <span className="text-amber-500">FOOD</span>
                </Typography>
            </div>
            <Typography variant="h6" className="font-bold text-stone-800">
                Bem-vindo de volta!
            </Typography>
            <Typography variant="body2" className="text-stone-500 mt-1">
                Acesse seu painel para gerenciar seus pedidos.
            </Typography>
        </Box>

        {/* Formulário */}
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          autoComplete="off"
          className="p-8 pt-6 flex flex-col gap-5"
        >
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center font-medium animate-shake">
              {error}
            </div>
          )}

          <TextField
            id="email"
            label="Seu e-mail"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Mail size={20} className="text-stone-400" />
                    </InputAdornment>
                ),
                sx: { borderRadius: '12px' }
            }}
            // AQUI ESTÁ ONDE A VARIÁVEL colors É USADA
            sx={{
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: colors.primaryBlue },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: colors.primaryBlue }
            }}
          />

          <TextField
            id="password"
            label="Sua senha"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Lock size={20} className="text-stone-400" />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton 
                            onClick={() => setShowPassword(!showPassword)} 
                            edge="end"
                            className="text-stone-400"
                        >
                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </IconButton>
                    </InputAdornment>
                ),
                sx: { borderRadius: '12px' }
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: colors.primaryBlue },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: colors.primaryBlue }
            }}
          />

          <div className="flex justify-end">
            <a href="#" className="text-sm font-medium text-blue-800 hover:text-amber-600 transition-colors">
                Esqueceu a senha?
            </a>
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            size="large"
            // AQUI TAMBÉM USA colors
            sx={{
                bgcolor: colors.accentYellow,
                color: colors.primaryBlue,
                fontWeight: 'bold',
                fontSize: '1rem',
                padding: '12px',
                borderRadius: '12px',
                boxShadow: 'none',
                textTransform: 'none',
                '&:hover': { 
                    bgcolor: '#f59e0b',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)' 
                },
                '&:disabled': {
                    bgcolor: '#f3f4f6',
                    color: '#9ca3af'
                }
            }}
          >
            {loading ? (
                <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" /> Entrando...
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    Acessar Sistema <ArrowRight size={18} />
                </span>
            )}
          </Button>
        </Box>
        
        {/* Rodapé */}
        <div className="bg-stone-50 p-4 text-center border-t border-stone-100">
            <Typography variant="body2" className="text-stone-500">
                Ainda não tem conta? <a href="#" className="font-bold text-blue-900 hover:underline">Cadastre seu restaurante</a>
            </Typography>
        </div>
      </Paper>

      <div className="absolute bottom-4 text-blue-200/40 text-xs">
        &copy; 2024 Sigo Food. Todos os direitos reservados.
      </div>
    </div>
  );
}
