'use client';

import { useEffect, useState } from "react";
import { buscaMetodoPagamentos, MetodoPagamento } from "@/app/data/service/MetodoPagamentoService";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

export default function MetodoPagamentos() {
    // Especificar o tipo de estado corretamente
    const [metodoPagamentos, setMetodoPagamentos] = useState<MetodoPagamento[]>([]); // Agora o estado é um array de MetodoPagamento
    const [error, setError] = useState(false);

    useEffect(() => {
        // Função assíncrona para buscar MetodoPagamentos
        async function fetchMetodoPagamentos() {
            try {
                const response = await buscaMetodoPagamentos();
                console.log(response?.data)
                if (response?.data) {
                    setMetodoPagamentos(response.data.data); // Atualiza o estado com as MetodoPagamentos
                }
            } catch (err) {
                console.error("Erro ao buscar MetodoPagamentos:", err);
                setError(true);
            }
        }

        fetchMetodoPagamentos();
    }, []); // O array vazio garante que a função execute apenas uma vez

    return (
        <>
            <Typography component="h2" variant="h5">
                Componentes de MetodoPagamentos
            </Typography>
            {error ? (
                <Typography component="p" color="error">
                    Não foi possível carregar as MetodoPagamentos.
                </Typography>
            ) : (
                <List>
                    {metodoPagamentos.map((metodoPagamento) => (
                        <ListItem key={metodoPagamento.id}>
                            <ListItemText primary={metodoPagamento.name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );
}
