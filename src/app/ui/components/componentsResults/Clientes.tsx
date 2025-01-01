'use client';

import { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { buscaClientes, Cliente } from "@/app/data/service/ClienteService";

// Definir a interface Categoria

export default function Clientes() {
    // Especificar o tipo de estado corretamente
    const [clientes, setClientes] = useState<Cliente[]>([]); // Agora o estado é um array de Categoria
    const [error, setError] = useState(false);

    useEffect(() => {
        // Função assíncrona para buscar clientes
        async function fetchClientes() {
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

        fetchClientes();
    }, []); // O array vazio garante que a função execute apenas uma vez

    return (
        <>
            <Typography component="h2" variant="h5">
                Componentes de clientes
            </Typography>
            {error ? (
                <Typography component="p" color="error">
                    Não foi possível carregar as clientes.
                </Typography>
            ) : (
                <List>
                    {clientes.map((cliente) => (
                        <ListItem key={cliente.id}>
                            <ListItemText primary={cliente.first_name+" "+cliente.last_name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );
}
