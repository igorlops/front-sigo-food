'use client';

import {  useState } from "react";
import { Produto } from "@/app/data/service/ProdutoService";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

interface ProdutoProps {
    produtos: Array<Produto>
    handleEditar: (id:number) => void
    handleExcluir: (id:number) => void
}
export default function Produtos({produtos, handleEditar, handleExcluir}:ProdutoProps) {
    // Especificar o tipo de estado corretamente
    const [error, setError] = useState(false);

    return (
        <>
        {error ? (
            <Typography component="p" color="error">
                Não foi possível carregar as produtos.
            </Typography>
        ) : (
            <TableContainer component={Paper} className="my-11">
                <Table sx={{ minWidth: 650 }} size="small" aria-label="Tabela de produtos">
                    <TableHead>
                        <TableRow>
                            <TableCell>Actions</TableCell>
                            <TableCell align="right">Produto</TableCell>
                            <TableCell align="right">Descrição</TableCell>
                            <TableCell align="right">Preço</TableCell>
                            <TableCell align="right">Categoria</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {produtos.length > 0 ? (produtos.map((produto) => (
                        <TableRow
                            hover
                            key={produto.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                <IconButton color="warning" onClick={() => handleEditar(produto.id)}>
                                    <Edit/>
                                </IconButton>
                                <IconButton color="error" onClick={() => handleExcluir(produto.id)}>
                                    <Delete/>
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">{produto.name}</TableCell>
                            <TableCell align="right">{produto.description}</TableCell>
                            <TableCell align="right">{produto.price}</TableCell>
                            <TableCell align="right">{produto.category.name}</TableCell>
                            <TableCell align="right">{produto.status}</TableCell>
                        </TableRow>
                    ))) : (
                        <TableRow>
                            <TableCell align="center">
                                Não há produtos
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        )}
        </>
    );
}
