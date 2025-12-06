'use client';

import { useEffect, useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
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
      className="px-10 py-10 rounded-xl flex flex-col gap-6 items-center min-w-[400px] bg-gray-100"
    >
      <Typography variant="h5" className="text-blue-900 font-bold">
        {cliente_id ? 'Editar Cliente' : 'Adicionar Cliente'}
      </Typography>

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <TextField
        className="w-full"
        label="Nome completo"
        variant="outlined"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <TextField
        className="w-full"
        label="Telefone"
        variant="outlined"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        helperText="Ex: (11) 99999-9999"
      />

      <TextField
        className="w-full"
        label="E-mail"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Button type="submit" variant="contained" color="primary" className="w-full">
        {cliente_id ? 'Atualizar' : 'Adicionar'}
      </Button>
    </Box>
  );
}
