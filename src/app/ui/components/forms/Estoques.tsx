'use client';

import { useEffect, useState } from "react";
import { buscaEstoques, Estoque } from "@/app/data/service/EstoqueService";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

// Definir a interface Estoque

export default function Estoques() {
    // Especificar o tipo de estado corretamente
    const [estoques, setEstoques] = useState<Estoque[]>([]); // Agora o estado é um array de Estoque
    const [error, setError] = useState(false);

    useEffect(() => {
        // Função assíncrona para buscar Estoques
        async function fetchEstoques() {
            try {
                const response = await buscaEstoques();
                console.log(response?.data)
                if (response?.data) {
                    setEstoques(response.data.data); // Atualiza o estado com as Estoques
                }
            } catch (err) {
                console.error("Erro ao buscar Estoques:", err);
                setError(true);
            }
        }

        fetchEstoques();
    }, []); // O array vazio garante que a função execute apenas uma vez

    return (
        <>
            <Typography component="h2" variant="h5">
                Componentes de Estoques
            </Typography>
            {error ? (
                <Typography component="p" color="error">
                    Não foi possível carregar as Estoques.
                </Typography>
            ) : (
                <List>
                    {estoques.map((estoque) => (
                        <ListItem key={estoque.id}>
                            <ListItemText primary={estoque.quantity} />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );
}
