'use client';

import { useState } from "react";
import {ShowEstoque } from "@/app/data/service/EstoqueService";
import { Typography } from "@mui/material";
import TableComponent, { Column } from "../../../itens/TableComponent";
import ActionsComponents from "../../../itens/ActionsComponents";
import { LoadingState } from "../../../itens/LoadingState";

interface EstoqueProps {
    estoques: ShowEstoque[] | null
    loading: boolean
    handleShow: (product_id: number) => void
}
export default function Estoques({estoques, loading, handleShow}:EstoqueProps) {
    const columns: Column<ShowEstoque>[] = [
        {
            label: 'Ações',
            render: (row) => (
                <ActionsComponents
                    handleEditar={() => null}
                    handleExcluir={() => null}
                    handleShow={handleShow}
                    id={row.product_id}
                />
            ),
        },
        {
            label: 'Produto',
            render: (row) => row.product_name,
        },
        {
            label: 'Quantidade',
            render: (row) => row.quantity,
        }
    ];
    const [error, setError] = useState(false);

    return (
        <>
            {loading ? (
                <LoadingState/>
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
