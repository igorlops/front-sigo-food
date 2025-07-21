'use client';

import { useState } from "react";
import {ProdutosPaginados } from "@/app/data/service/ProdutoService";
import { Box, CircularProgress, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import {Delete, Edit } from "@mui/icons-material";

interface ProdutoProps {
    produtos: ProdutosPaginados | null
    loading: boolean
    handleEditar: (id:number) => void
    handleExcluir: (id:number) => void
    handlePageChange: (page:number) => void
}
export default function Produtos({produtos, loading, handleEditar, handleExcluir, handlePageChange}:ProdutoProps) {
    
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
                    { produtos && produtos.data.length > 0 && !loading ? (produtos.data.map((produto) => (
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
                        loading ? (
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="center">
                                        <CircularProgress/>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                        ) : (
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="center">
                                        Não há produtos
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            )
                    )} 
                    </TableBody>
                </Table>
                <Box className="flex justify-center py-10">
                <Pagination
                    count={produtos?.last_page} 
                    page={produtos?.current_page} 
                    onChange={(e,value) => {
                        handlePageChange(value)
                    }}
                    color="primary"
                />
                </Box>
            </TableContainer>
        )}
        </>
    );
}
