'use client';

import { useEffect, useState } from "react";
import { buscaCategorias, Categoria } from "@/app/data/service/CategoriaService";
import { Typography, List, ListItem, ListItemText, Card, Grid2 } from "@mui/material";

// Definir a interface Categoria

export default function Categorias() {
    // Especificar o tipo de estado corretamente
    const [categorias, setCategorias] = useState<Categoria[]>([]); // Agora o estado é um array de Categoria
    const [error, setError] = useState(false);

    useEffect(() => {
        // Função assíncrona para buscar categorias
        async function fetchCategorias() {
            try {
                const response = await buscaCategorias();
                console.log(response?.data)
                if (response?.data) {
                    setCategorias(response.data.data); // Atualiza o estado com as categorias
                }
            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
                setError(true);
            }
        }

        fetchCategorias();
    }, []); // O array vazio garante que a função execute apenas uma vez

    return (
        <>
            <Typography component="h2" variant="h5">
                Componentes de categorias
            </Typography>
            {error ? (
                <Typography component="p" color="error">
                    Não foi possível carregar as categorias.
                </Typography>
            ) : (
                <Grid2 container>
                    {categorias.map((categoria) => (
                        <Grid2 size={{ xs: 2, sm: 4, md: 4 }} key={categoria.id}>
                            <Typography component={'p'} variant="body2">{categoria.name}</Typography>
                        </Grid2>
                    ))}
                </Grid2>
            )}
        </>
    );
}
