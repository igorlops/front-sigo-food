'use client';

import { useEffect, useState } from "react";
import { buscaPedidos, Pedido } from "@/app/data/service/PedidoService";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

// Definir a interface Pedido

export default function Pedidos() {
    // Especificar o tipo de estado corretamente
    const [pedidos, setPedidos] = useState<Pedido[]>([]); // Agora o estado é um array de Pedido
    const [error, setError] = useState(false);

    useEffect(() => {
        // Função assíncrona para buscar Pedidos
        async function fetchPedidos() {
            try {
                const response = await buscaPedidos();
                console.log(response?.data)
                if (response?.data) {
                    setPedidos(response.data.data); // Atualiza o estado com as Pedidos
                }
            } catch (err) {
                console.error("Erro ao buscar Pedidos:", err);
                setError(true);
            }
        }

        fetchPedidos();
    }, []); // O array vazio garante que a função execute apenas uma vez

    return (
        <>
            <Typography component="h2" variant="h5">
                Componentes de Pedidos
            </Typography>
            {error ? (
                <Typography component="p" color="error">
                    Não foi possível carregar os Pedidos.
                </Typography>
            ) : (
                <List>
                    {pedidos.map((pedido) => (
                        <ListItem key={pedido.id}>
                            <ListItemText primary={pedido.total_value} />
                            <ListItemText primary={pedido.payment_method_id} />
                            <ListItemText primary={pedido.status} />
                            <ListItemText primary={pedido.client_id} />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );
}
