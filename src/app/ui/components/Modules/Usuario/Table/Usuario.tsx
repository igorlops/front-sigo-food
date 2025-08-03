'use client';

import { useEffect, useState } from "react";
import { buscaUsuarios, Usuario } from "@/app/data/service/UsuarioService";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

export default function Usuarios() {
    // Especificar o tipo de estado corretamente
    const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Agora o estado é um array de Usuario
    const [error, setError] = useState(false);

    useEffect(() => {
        // Função assíncrona para buscar Usuarios
        async function fetchUsuarios() {
            try {
                const response = await buscaUsuarios();
                console.log(response?.data)
                if (response?.data) {
                    setUsuarios(response.data.data); // Atualiza o estado com as Usuarios
                }
            } catch (err) {
                console.error("Erro ao buscar Usuarios:", err);
                setError(true);
            }
        }

        fetchUsuarios();
    }, []); // O array vazio garante que a função execute apenas uma vez

    return (
        <>
            <Typography component="h2" variant="h5">
                Componentes de Usuarios
            </Typography>
            {error ? (
                <Typography component="p" color="error">
                    Não foi possível carregar as Usuarios.
                </Typography>
            ) : (
                <List>
                    {usuarios.map((usuario) => (
                        <ListItem key={usuario.id}>
                            <ListItemText primary={usuario.name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );
}
