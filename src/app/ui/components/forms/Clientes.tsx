'use client';

import { useState } from "react";
import { Typography,  Box, TextField, Button } from "@mui/material";
import { adicionaCliente, atualizaCliente } from "@/app/data/service/ClienteService";
import { UserLocalStorage } from "@/app/data/utils/const/User";

// Definir a interface Categoria

interface FormClientesProps {
  onSuccess: () => void
  cliente_id: number | null
}

export default function FormClientes({onSuccess,cliente_id}:FormClientesProps) {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const userLocalStorage = UserLocalStorage();
    if (!userLocalStorage || userLocalStorage.restaurant_id === null) {
        setError("Usuário não está logado ou restaurante não encontrado.");
        return null; 
    }
    const restaurant_id = userLocalStorage.restaurant_id;

    const handleEditaCliente = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      const formData = new FormData();
      if (name) formData.append('name', name);
      if (phone) formData.append('phone', phone);
      if (email) formData.append('email', email);
      if (restaurant_id) formData.append('restaurant_id', String(restaurant_id));

      if(cliente_id) {
          try {
              const response = await atualizaCliente(cliente_id, formData);
              if (!response?.data.error) {
                setName("")
                setEmail("")
                setPhone("")
              }
          } catch (error) {
              console.error(error);
              setError('Erro ao adicionar a produto.');
          }
      }
    };

    const handleCliente = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(""); // Limpa mensagens de erro anteriores
      const formData = new FormData();
      if (name) formData.append('name', name);
      if (phone) formData.append('phone', phone);
      if (email) formData.append('email', email);
      if (restaurant_id) formData.append('restaurant_id', String(restaurant_id));
      try {
          const response = await adicionaCliente(formData);
          if(!response?.data.error) {
            setName("")
            setPhone("") 
            setEmail("")
            onSuccess();
          }
      } catch (error) {
          setError("Erro ao adicionar cliente" + error)
      }
      
    };
  
    return (
        <Box
          className="p-8 bg-white rounded-lg shadow-md w-full max-w-md"
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
          onSubmit={cliente_id ? handleEditaCliente : handleCliente}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h5"
            className="text-gray-800 font-bold text-center mb-4"
          >
            {cliente_id ? 'Editar Cliente' : 'Adicionar cliente'}
          </Typography>
  
          {error && (
            <Typography variant="body2" color="error" className="text-center">
              {error}
            </Typography>
          )}
  
          <TextField
            id="name"
            label="Nome completo"
            variant="outlined"
            fullWidth
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            id="phone"
            label="phone"
            variant="outlined"
            fullWidth
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            {cliente_id ? 'Editar Cliente' : 'Adicionar Cliente'}
          </Button>
        </Box>
    );
}
