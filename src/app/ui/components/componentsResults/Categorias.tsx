'use client';

import { Categoria } from '@/app/data/service/CategoriaService';
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

interface CategoriasProps {
  categorias: Categoria[];
  error: boolean;
}

export default function Categorias({ categorias, error }: CategoriasProps) {
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
                    <TableCell align="right">Nome</TableCell>
                    <TableCell align="right">Descrição</TableCell>
                    <TableCell align="right">Preço</TableCell>
                    <TableCell align="right">Status</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {categorias.length > 0 ? (categorias.map((categoria) => (
                    <TableRow
                        hover
                        key={categoria.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {categoria.name}
                        </TableCell>
                        <TableCell align="right">{categoria.restaurant_id}</TableCell>
                        <TableCell align="right">{categoria.id}</TableCell>
                        <TableCell align="right">{categoria.name}</TableCell>
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
