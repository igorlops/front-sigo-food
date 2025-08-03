'use client';

import { Categoria, CategoriasPaginadas } from '@/app/data/service/CategoriaService';
import { Delete, Edit } from '@mui/icons-material';
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Pagination, Box, CircularProgress, IconButton } from '@mui/material';
import { useState } from 'react';
import TableComponent, { Column } from '../../../itens/TableComponent';
import ActionsComponents from '../../../itens/ActionsComponents';
import { LoadingState } from '../../../itens/LoadingState';

interface CategoriasProps {
    categorias: CategoriasPaginadas | null;
    loading: boolean;
    handleEditar: (id:number) => void
    handleExcluir: (id:number) => void
    handlePageChange: (page:number) => void
}

export default function Categorias({ categorias,loading, handleEditar, handleExcluir, handlePageChange}: CategoriasProps) {
      const [error, setError] = useState(false);
        const columns: Column<Categoria>[] = [
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
        ];
    return (
        <>
            {loading ? (
                <LoadingState/>
            ) : (
                <>
                    {error ? (
                        <Typography component="p" color="error">
                            Não foi possível carregar as categorias.
                        </Typography>
                    ) : (
                        <>
                            <TableComponent
                                columns={columns}
                                data={categorias?.data ?? []}
                            />
                            {categorias && categorias.data.length > 0 && (
                                <Box className="flex justify-center py-10">
                                <Pagination
                                    count={categorias?.last_page ?? 1} 
                                    page={categorias?.current_page ?? 1} 
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
            )}
        </>
    );
}
