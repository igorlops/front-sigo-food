'use client';

import { useState } from "react";
import { ClientesPaginados } from "@/app/data/service/ClienteService";
import { Box, CircularProgress, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import {Delete, Edit } from "@mui/icons-material";

interface ProdutoProps {
    clientes: ClientesPaginados | null
    loading: boolean
    handleEditar: (id:number) => void
    handleExcluir: (id:number) => void
    handlePageChange: (page:number) => void
}
export default function Produtos({clientes, loading, handleEditar, handleExcluir, handlePageChange}:ProdutoProps) {
    
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
                            <TableCell align="right">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { clientes && clientes.data?.length > 0 && !loading ? (clientes.data.map((cliente) => (
                        <TableRow
                            hover
                            key={cliente.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                <IconButton color="warning" onClick={() => handleEditar(cliente.id)}>
                                    <Edit/>
                                </IconButton>
                                <IconButton color="error" onClick={() => handleExcluir(cliente.id)}>
                                    <Delete/>
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">{cliente.name}</TableCell>
                        </TableRow>
                    ))) : (
                        loading ? (
                                <TableRow>
                                    <TableCell align="center">
                                        <CircularProgress/>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                        ) : (
                                <TableRow>
                                    <TableCell align="center">
                                        Não há clientes
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            )
                    )} 
                    </TableBody>
                </Table>
                <Box className="flex justify-center py-10">
                <Pagination
                    count={clientes?.last_page ?? 1} 
                    page={clientes?.current_page ?? 1} 
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
