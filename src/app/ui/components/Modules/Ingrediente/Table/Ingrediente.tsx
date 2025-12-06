'use client';

import { IngredientesPaginados, Ingredient } from "@/app/data/service/IngredienteService";
import { Box, Pagination } from "@mui/material";
import TableComponent, { Column } from "../../../itens/TableComponent";
import { LoadingState } from "../../../itens/LoadingState";
import ActionsComponents from "../../../itens/ActionsComponents";

interface IngredienteTableProps {
    ingredientes: IngredientesPaginados | null;
    loading: boolean;
    handleEditar: (id: number) => void;
    handleExcluir: (id: number) => void;
    handlePageChange: (page: number) => void;
}

export default function IngredienteTable({
    ingredientes,
    loading,
    handleEditar,
    handleExcluir,
    handlePageChange
}: IngredienteTableProps) {

    const columns: Column<Ingredient>[] = [
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
            label: 'Quantidade',
            render: (row) => `${parseFloat(row.quantity).toFixed(2)} ${row.unit}`,
        },
        {
            label: 'Qtd Mínima',
            render: (row) => row.min_quantity
                ? `${parseFloat(row.min_quantity).toFixed(2)} ${row.unit}`
                : '-',
        },
        {
            label: 'Observação',
            render: (row) => row.observation || '-',
        },
    ];

    return (
        <>
            {loading ? (
                <LoadingState />
            ) : (
                <>
                    <TableComponent
                        columns={columns}
                        data={ingredientes?.data ?? []}
                    />

                    {ingredientes && ingredientes.data.length > 0 && (
                        <Box className="flex justify-center py-10">
                            <Pagination
                                count={ingredientes?.last_page ?? 1}
                                page={ingredientes?.current_page ?? 1}
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
