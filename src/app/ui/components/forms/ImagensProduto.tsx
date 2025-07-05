'use client';

import { useEffect, useState } from "react";
import { buscaImagemProdutos, ImagemProduto } from "@/app/data/service/ImagemProdutoService";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
// Definir a interface ImagemProduto

export default function ImagemProdutos(productID:number) {
    // Especificar o tipo de estado corretamente
    const [imagemProdutos, setImagemProdutos] = useState<ImagemProduto[]>([]); // Agora o estado é um array de ImagemProduto
    const [error, setError] = useState(false);

    useEffect(() => {
        // Função assíncrona para buscar ImagemProdutos
        async function fetchImagemProdutos() {
            try {
                const response = await buscaImagemProdutos(productID);
                console.log(response?.data)
                if (response?.data) {
                    setImagemProdutos(response.data.data); // Atualiza o estado com as ImagemProdutos
                }
            } catch (err) {
                console.error("Erro ao buscar ImagemProdutos:", err);
                setError(true);
            }
        }

        fetchImagemProdutos();
    }, [productID]); // O array vazio garante que a função execute apenas uma vez

    return (
        <>
            <Typography component="h2" variant="h5">
                Componentes de ImagemProdutos
            </Typography>
            {error ? (
                <Typography component="p" color="error">
                    Não foi possível carregar as ImagemProdutos.
                </Typography>
            ) : (
                <List>
                    {imagemProdutos.map((imagemProduto) => (
                        <ListItem key={imagemProduto.id}>
                            <ListItemText primary={imagemProduto.image_name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );
}
