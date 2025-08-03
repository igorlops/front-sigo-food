'use client';

import { useState } from "react";
import { Cliente, ClientesPaginados } from "@/app/data/service/ClienteService";
import { Box, CircularProgress, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import {Delete, Edit } from "@mui/icons-material";
import TableComponent, { Column } from "../../../itens/TableComponent";
import { LoadingState } from "../../../itens/LoadingState";
import ActionsComponents from "../../../itens/ActionsComponents";

interface ProdutoProps {
    clientes: ClientesPaginados | null
    loading: boolean
    handleEditar: (id:number) => void
    handleExcluir: (id:number) => void
    handlePageChange: (page:number) => void
}
export default function Produtos({clientes, loading, handleEditar, handleExcluir, handlePageChange}:ProdutoProps) {
    
    const [error, setError] = useState(false);
    const columns: Column<Cliente>[] = [
        {
            label: 'Ações',
            render: (row) => (
                <ActionsComponents 
                    handleEditar={handleEditar}
                    handleExcluir={handleExcluir}
                    handleShow={() => null}
                    id={row.id}
                />
            ),
        },
        {
            label: 'Cliente',
            render: (row) => row.name,
        },
        {
            label: 'E-mail',
            render: (row) => row.email,
        },
        {
            label: 'Telefone',
            render: (row) => row.phone,
        }
    ];
    return (
        <>
            {loading ? (
                <>
                    <LoadingState/>
                </>
            ) : (
                <>
                    {error ? (
                        <Typography component="p" color="error">
                            Não foi possível carregar os clientes.
                        </Typography>
                    ) : (
                        <>
                            <TableComponent
                                columns={columns}
                                data={clientes?.data ?? []}
                            />
                            {clientes && clientes.data.length > 0 && (
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
                            )}
                        </>
                    )}
                </>
            )
        }   
        </>
    );
}
