'use client';

import { useEffect, useState } from "react";
import TableComponent, { Column } from "../../../itens/TableComponent";
import { LoadingState } from "../../../itens/LoadingState";
import { Pedido, PedidosPaginados } from "@/app/data/service/PedidoService";
import ActionsComponents from "../../../itens/ActionsComponents";
import { Box, Pagination } from "@mui/material";

// Definir a interface Pedido

interface PedidoProps {
    pedidos: PedidosPaginados | null;
    loading: boolean;
    handleEditar: (id: number) => void;
    handleExcluir: (id: number) => void;
    handlePageChange: (page: number) => void;
}
export default function Pedidos({ pedidos, loading, handlePageChange, handleEditar, handleExcluir }: PedidoProps) {
    const columns: Column<Pedido>[] = [
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
            render: (row) => row.client_name,
        },
        {
            label: 'Endereço',
            render: (row) => row.delivery_address,
        },
        {
            label: 'Tipo de venda',
            render: (row) => row.order_type,
        },
        {
            label: 'Status',
            render: (row) => row.status_name,
        },
    ];
    const [error, setError] = useState(false);

    return (
        <>
            {loading ? (
                <LoadingState />
            ) : (
                <>
                    <TableComponent
                        columns={columns}
                        data={pedidos?.data ?? []}
                    />

                    {pedidos && pedidos.data.length > 0 && (
                        <Box className="flex justify-center py-10">
                            <Pagination
                                count={pedidos?.last_page ?? 1}
                                page={pedidos?.current_page ?? 1}
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
