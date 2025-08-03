import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

interface ActionsComponentProps {
    id: number;
    handleEditar: (id:number) => void |  undefined | null;
    handleExcluir: (id:number) => void | undefined |  null;
    handleShow: (id:number) => void | undefined | null;
}

export default function ActionsComponents({id, handleEditar, handleExcluir, handleShow}: ActionsComponentProps) {
    return (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
            {handleEditar != null && (
                <IconButton size="small" color="warning" onClick={() => handleEditar(id)}>
                    <Edit fontSize="inherit" />
                </IconButton>
            )}
            {handleExcluir != null && (
                <IconButton size="small" color="error" onClick={() => handleExcluir(id)}>
                    <Delete fontSize="inherit" />
                </IconButton>
            )}
            {handleShow != null && (
                <IconButton size="small" color="primary" onClick={() => handleShow(id)}>
                    <Visibility fontSize="inherit" />
                </IconButton>
            )}
        </Box>
    )
}