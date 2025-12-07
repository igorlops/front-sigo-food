'use client';

import { useEffect, useState } from "react";
import { Typography, Box, TextField, Button, Stack } from "@mui/material";
import { adicionaCliente, atualizaCliente, buscaCliente } from "@/app/data/service/ClienteService";
import { UserLocalStorage } from "@/app/data/utils/const/User";

interface FormClientesProps {
  onSuccess: () => void;
  cliente_id: number | null;
}

export default function FormClientes({ onSuccess, cliente_id }: FormClientesProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const userLocalStorage = UserLocalStorage();
  const restaurant_id = userLocalStorage?.restaurant_id;

  useEffect(() => {
    if (cliente_id) {
      fetchCliente(cliente_id);
    }
  }, [cliente_id]);

  const fetchCliente = async (id: number) => {
    try {
      const response = await buscaCliente(id);
      if (response?.data.data && response.data.data.length > 0) {
        const cliente = response.data.data[0];
        setName(cliente.name);
        setPhone(cliente.phone);
        setEmail(cliente.email);
      }
    } catch (err) {
      console.error('Erro ao buscar cliente:', err);
      setError('Erro ao buscar cliente');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!restaurant_id) {
      setError("Usuário não está logado ou restaurante não encontrado.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('restaurant_id', String(restaurant_id));

    try {
      const response = cliente_id
        ? await atualizaCliente(cliente_id, formData)
        : await adicionaCliente(formData);

      if (!response?.data.error) {
        setName("");
        setPhone("");
        setEmail("");
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao salvar cliente.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        borderRadius: 3,
        border: '1px solid rgba(0, 0, 0, 0.08)',
        bgcolor: 'white',
        minWidth: 400,
        maxWidth: 600,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#1e3a8a',
          mb: 3
        }}
      >
        {cliente_id ? 'Editar Cliente' : 'Adicionar Cliente'}
      </Typography>

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Stack spacing={3}>
        <TextField
          label="Nome completo"
          variant="outlined"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Telefone"
          variant="outlined"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          helperText="Ex: (11) 99999-9999"
          fullWidth
        />

        <TextField
          label="E-mail"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: '#1e3a8a',
            '&:hover': { bgcolor: '#0c1e3f' }
          }}
          fullWidth
        >
          {cliente_id ? 'Atualizar' : 'Adicionar'}
        </Button>
      </Stack>
    </Box>
  );
}
