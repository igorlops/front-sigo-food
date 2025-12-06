import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

interface ActionsComponentProps {
    id: number;
    handleEditar: (id: number) => void | undefined | null;
    handleExcluir: (id: number) => void | undefined | null;
    handleShow: (id: number) => void | undefined | null;
}

const colors = {
    primaryBlue: '#1e3a8a',
    accentYellow: '#fcd34d',
};

export default function ActionsComponents({ id, handleEditar, handleExcluir, handleShow }: ActionsComponentProps) {
    return (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
            {handleShow != null && (
                <Tooltip title="Visualizar" arrow>
                    <IconButton
                        size="small"
                        onClick={() => handleShow(id)}
                        sx={{
                            color: colors.primaryBlue,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: 'rgba(30, 58, 138, 0.1)',
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <Visibility fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}

            {handleEditar != null && (
                <Tooltip title="Editar" arrow>
                    <IconButton
                        size="small"
                        onClick={() => handleEditar(id)}
                        sx={{
                            color: '#f59e0b',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: 'rgba(245, 158, 11, 0.1)',
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}

            {handleExcluir != null && (
                <Tooltip title="Excluir" arrow>
                    <IconButton
                        size="small"
                        onClick={() => handleExcluir(id)}
                        sx={{
                            color: '#ef4444',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: 'rgba(239, 68, 68, 0.1)',
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <Delete fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
}