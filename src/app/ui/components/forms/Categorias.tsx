import { useEffect, useState } from "react";
import { adicionaCategoria, Categoria,  } from "@/app/data/service/CategoriaService";
import { Typography, Grid2, TextField, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

// Definir a interface Categoria

export default function FormCategorias() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
  
    const router = useRouter()
  
    const handleCategoria = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(""); // Limpa mensagens de erro anteriores
  
      try {
          const response = await adicionaCategoria(name);
          if(!response?.data.error) {
            let data = response?.data.data;
  
            router.push('/dashboard/categorias')
          }
      } catch (error) {
          console.error(error)
      }
      
    };
  
    return (
      <div className="flex justify-center items-center bg-gray-100">
        <Box
          className="p-8 bg-white rounded-lg shadow-md w-full max-w-md"
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
          onSubmit={handleCategoria}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h5"
            className="text-gray-800 font-bold text-center mb-4"
          >
            Adicionar categoria
          </Typography>
  
          {error && (
            <Typography variant="body2" color="error" className="text-center">
              {error}
            </Typography>
          )}
  
          <TextField
            id="name"
            label="Nome da categoria"
            variant="outlined"
            fullWidth
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4"
          >
            Adicionar
          </Button>
        </Box>
      </div>
    );
}
