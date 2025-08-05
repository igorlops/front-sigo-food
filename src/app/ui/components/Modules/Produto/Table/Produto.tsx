'use client';

import { ProdutosPaginados, Produto } from "@/app/data/service/ProdutoService";
import { Box, Pagination} from "@mui/material";
import TableComponent, { Column } from "../../../itens/TableComponent";
import { LoadingState } from "../../../itens/LoadingState";
import ActionsComponents from "../../../itens/ActionsComponents";

interface ProdutoProps {
    produtos: ProdutosPaginados | null;
    loading: boolean;
    handleEditar: (id: number) => void;
    handleExcluir: (id: number) => void;
    handlePageChange: (page: number) => void;
}

export default function Produtos({ produtos, loading, handleEditar, handleExcluir, handlePageChange }: ProdutoProps) {

    const columns: Column<Produto>[] = [
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
            label: 'Produto',
            render: (row) => row.name,
        },
        {
            label: 'Descrição',
            render: (row) => row.description,
        },
        {
            label: 'Preço',
            render: (row) => {
                const priceAsNumber = row.price ? parseFloat(row.price) : 0;
                return `R$ ${priceAsNumber.toFixed(2).replace('.', ',')}`;
            },
        },
        {
            label: 'Categoria',
            render: (row) => row.category.name,
        },
        {
            label: 'Status',
            render: (row) => row.status.description,
        },
    ];

    return (
        <>
            {loading ? (
                <LoadingState/>
            ) : (
                <>
                    <TableComponent
                        columns={columns}
                        data={produtos?.data ?? []}
                    />

                    {produtos && produtos.data.length > 0 && (
                         <Box className="flex justify-center py-10">
                            <Pagination
                                count={produtos?.last_page ?? 1}
                                page={produtos?.current_page ?? 1}
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
