'use client';

import { useEffect, useState } from "react";
import { buscaUsuarios, Usuario, UsuariosPaginados } from "@/app/data/service/UsuarioService";
import { Typography, List, ListItem, ListItemText, Box, Pagination } from "@mui/material";
import { LoadingState } from "../../../itens/LoadingState";
import TableComponent, { Column } from "../../../itens/TableComponent";
import ActionsComponents from "../../../itens/ActionsComponents";
interface UsuarioProps {
    usuarios: UsuariosPaginados | null;
    loading: boolean;
    handleEditar: (id: number) => void;
    handleExcluir: (id: number) => void;
    handlePageChange: (page: number) => void;
}

export default function Usuarios({ usuarios, loading, handlePageChange, handleEditar, handleExcluir }: UsuarioProps) {

    const columns: Column<Usuario>[] = [
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
            label: 'Nome',
            render: (row) => row.name,
        },
        {
            label: 'Email',
            render: (row) => row.email,
        }
    ];

    return (
        <>
            {loading ? (
                <LoadingState />
            ) : (
                <>
                    <TableComponent
                        columns={columns}
                        data={usuarios?.data ?? []}
                    />

                    {usuarios && usuarios.data.length > 0 && (
                        <Box className="flex justify-center py-10">
                            <Pagination
                                count={usuarios?.last_page ?? 1}
                                page={usuarios?.current_page ?? 1}
                                onChange={(e, value) => {
                                    handlePageChange(value)
                                }}
                                color="primary"
                            />
                        </Box>
                    )}
                </>
            )}
        </>
    );
}
