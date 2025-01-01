'use client';

import { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText, Box, TextField, Button } from "@mui/material";
import { adicionaCliente } from "@/app/data/service/ClienteService";
import { useRouter } from "next/navigation";

// Definir a interface Categoria

export default function FormClientes() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [cpf, setCpf] = useState("");
    const [date_of_birth, setDateOfBirth] = useState(new Date);
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
  
    const router = useRouter()
  
    const handleCliente = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(""); // Limpa mensagens de erro anteriores
  
      try {
          const response = await adicionaCliente(first_name,last_name,cpf,date_of_birth,telefone,email);
          if(!response?.data.error) {
            let data = response?.data.data;
  
            router.push('/dashboard/clients')
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
          onSubmit={handleCliente}
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
            id="first_name"
            label="Primeiro nome"
            variant="outlined"
            fullWidth
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            id="last_name"
            label="Segundo nome"
            variant="outlined"
            fullWidth
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            id="cpf"
            label="CPF"
            variant="outlined"
            fullWidth
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <TextField
            id="date_of_birth"
            label="Data de nascimento"
            variant="outlined"
            fullWidth
            type="date"
            value={date_of_birth}
            onChange={(e) => setDateOfBirth(new Date(e.target.value))}
            required
          />
          <TextField
            id="telefone"
            label="Telefone"
            variant="outlined"
            fullWidth
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            fullWidth
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
