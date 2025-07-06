'use client';

import { useEffect, useState } from "react";
import { buscaProdutos, Produto } from "@/app/data/service/ProdutoService";
import { Typography } from "@mui/material";
import TableComponent from "../itens/TableComponent";

type ProdutoTabela = Pick<Produto, 'name' | 'description' | 'category_id'>;

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
            {error ? (
                <Typography component="p" color="error">
                    Não foi possível carregar as Produtos.
                </Typography>
            ) : (
                <TableComponent<ProdutoTabela>
                    data={produtos}
                    columns={[
                        { label: "Nome", render: (item) => item.name },
                        { label: "Descrição", render: (item) => item.description },
                        { label: "Categoria", render: (item) => item.category_id }
                    ]}
                />
            )}
        </>
    );
}
