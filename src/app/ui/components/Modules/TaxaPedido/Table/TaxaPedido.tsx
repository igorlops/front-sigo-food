'use client';

import { TaxasPaginadas, OrderFee } from "@/app/data/service/TaxaPedidoService";
import { Box, Chip, Pagination } from "@mui/material";
import TableComponent, { Column } from "../../../itens/TableComponent";
import { LoadingState } from "../../../itens/LoadingState";
import ActionsComponents from "../../../itens/ActionsComponents";

interface TaxaPedidoTableProps {
    taxas: TaxasPaginadas | null;
    loading: boolean;
    handleEditar: (id: number) => void;
    handleExcluir: (id: number) => void;
    handlePageChange: (page: number) => void;
}

const getTipoLabel = (type: string) => {
    const tipos: Record<string, string> = {
        'delivery': 'Entrega',
        'service': 'Serviço',
        'packaging': 'Embalagem',
        'other': 'Outra',
    };
    return tipos[type] || type;
};

const getTipoColor = (type: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    const colors: Record<string, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
        'delivery': 'primary',
        'service': 'secondary',
        'packaging': 'info',
        'other': 'default',
    };
    return colors[type] || 'default';
};

export default function TaxaPedidoTable({
    taxas,
    loading,
    handleEditar,
    handleExcluir,
    handlePageChange
}: TaxaPedidoTableProps) {

    const columns: Column<OrderFee>[] = [
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
            label: 'Tipo',
            render: (row) => (
                <Chip
                    label={getTipoLabel(row.type)}
                    color={getTipoColor(row.type)}
                    size="small"
                />
            ),
        },
        {
            label: 'Descrição',
            render: (row) => row.desc,
        },
        {
            label: 'Valor',
            render: (row) => {
                const priceAsNumber = parseFloat(row.unit_price);
                return `R$ ${priceAsNumber.toFixed(2).replace('.', ',')}`;
            },
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
                        data={taxas?.data ?? []}
                    />

                    {taxas && taxas.data.length > 0 && (
                        <Box className="flex justify-center py-10">
                            <Pagination
                                count={taxas?.last_page ?? 1}
                                page={taxas?.current_page ?? 1}
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
