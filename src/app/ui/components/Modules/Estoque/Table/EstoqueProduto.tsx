'use client';

import { useState } from "react";
import { Estoque, ShowEstoque } from "@/app/data/service/EstoqueService";
import { Typography } from "@mui/material";
import TableComponent, { Column } from "../../../itens/TableComponent";
import ActionsComponents from "../../../itens/ActionsComponents";
import { LoadingState } from "../../../itens/LoadingState";

interface EstoqueProps {
    estoques: Estoque[] | null
    loading: boolean
    handleShow: (product_id: number) => void
}
export default function Estoques({ estoques, loading, handleShow }: EstoqueProps) {
    const columns: Column<Estoque>[] = [
        {
            label: 'Ações',
            render: (row) => (
                <ActionsComponents
                    handleEditar={null}
                    handleExcluir={null}
                    handleShow={handleShow}
                    id={row.product_id}
                />
            ),
        },
        {
            label: 'Quantidade',
            render: (row) => row.quantity,
        },
        {
            label: 'Tipo',
            render: (row) => row.type,
        }
    ];
    const [error, setError] = useState(false);

    return (
        <>
            {loading ? (
                <LoadingState />
            )
                :
                (
                    <>
                        <TableComponent
                            columns={columns}
                            data={estoques ?? []}
                        />
                    </>
                )
            }
        </>
    );
}
