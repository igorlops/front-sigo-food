'use client';

import { Categoria } from '@/app/data/service/CategoriaService';
import { Delete, Edit } from '@mui/icons-material';
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Pagination, Box, CircularProgress, IconButton } from '@mui/material';
import { useState } from 'react';

interface CategoriasProps {
  categorias: Categoria[];
  error: boolean;
}

export default function Categorias({ categorias}: CategoriasProps) {
      const [error, setError] = useState(false);

    return (
        <>
        {error ? (
            <Typography component="p" color="error">
                Não foi possível carregar as categorias.
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
                    { categorias && categorias.length > 0 && !loading ? (categorias.map((categoria) => (
                        <TableRow
                            hover
                            key={categoria.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                <IconButton color="warning" onClick={() => handleEditar(categoria.id)}>
                                    <Edit/>
                                </IconButton>
                                <IconButton color="error" onClick={() => handleExcluir(categoria.id)}>
                                    <Delete/>
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">{categoria.name}</TableCell>
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
                                        Não há categorias
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
                    count={categorias?.last_page ?? 1} 
                    page={categorias?.current_page ?? 1} 
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
