'use client';

import { useEffect, useState } from "react";
import { buscaProdutos, Produto } from "@/app/data/service/ProdutoService";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

export default function Produtos() {
    // Especificar o tipo de estado corretamente
    const [produtos, setProdutos] = useState<Produto[]>([]); // Agora o estado é um array de Produto
    const [error, setError] = useState(false);

    useEffect(() => {
        // Função assíncrona para buscar Produtos
        async function fetchProdutos() {
            try {
                const response = await buscaProdutos();
                console.log(response?.data)
                if (response?.data) {
                    setProdutos(response.data.data); // Atualiza o estado com as Produtos
                }
            } catch (err) {
                console.error("Erro ao buscar Produtos:", err);
                setError(true);
            }
        }

        fetchProdutos();
    }, []); // O array vazio garante que a função execute apenas uma vez

    return (
        <>
            <Typography component="h2" variant="h5">
                Componentes de Produtos
            </Typography>
            {error ? (
                <Typography component="p" color="error">
                    Não foi possível carregar as Produtos.
                </Typography>
            ) : (
                <List>
                    {produtos.map((produto) => (
                        <ListItem key={produto.id}>
                            {
                                produto.image_product ?
                                    (
                                        <>
                                            <img width={200} src={`http://localhost:8000/uploads/${produto.image_product[0].image_name}`}/>
                                        </>
                                    ) : (
                                        <>
                                            <Typography component='p'>
                                                Não contém imagem
                                            </Typography>
                                        </>
                                    )
                            }
                            <ListItemText primary={produto.name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );
}
