'use client';

import { buscaClientes, Cliente } from '@/app/data/service/ClienteService';
import Clientes from '@/app/ui/components/componentsResults/Clientes';
import FormClientes from '@/app/ui/components/forms/Clientes';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]); // Agora o estado é um array de Categoria
  const [error, setError] = useState(false);
  const fetchClientes = async () => {
      try {
          const response = await buscaClientes();
          console.log(response?.data)
          if (response?.data) {
              setClientes(response.data.data); // Atualiza o estado com as clientes
          }
      } catch (err) {
          console.error("Erro ao buscar clientes:", err);
          setError(true);
      }
  }

  useEffect(() => {
    fetchClientes()
  },[])
  return (
    <div>
      <Clientes clientes={clientes} error={error}/>
      <FormClientes onSuccess={fetchClientes}/>
    </div>
  );
}
