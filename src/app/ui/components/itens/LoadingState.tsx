import { Box, CircularProgress, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

const colors = {
    primaryBlue: '#1e3a8a',
    accentYellow: '#fcd34d',
};

export function LoadingState() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px',
                gap: 2,
            }}
        >
            <CircularProgress
                size={50}
                sx={{
                    color: colors.primaryBlue,
                    '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                    }
                }}
            />
            <Typography
                variant="body1"
                sx={{
                    color: colors.primaryBlue,
                    fontWeight: 500,
                }}
            >
                Carregando...
            </Typography>
        </Box>
    );
}

export function ErrorState({ message }: { message?: string }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                gap: 2,
                p: 4,
            }}
        >
            <ErrorOutline
                sx={{
                    fontSize: 60,
                    color: '#ef4444',
                }}
            />
            <Typography
                component="p"
                color="error"
                align="center"
                sx={{
                    fontWeight: 500,
                    fontSize: '1.1rem',
                }}
            >
                {message || 'Não foi possível carregar os dados. Tente novamente mais tarde.'}
            </Typography>
        </Box>
    );
}

export function EmptyState({ message }: { message?: string }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                gap: 2,
                p: 4,
            }}
        >
            <Typography
                variant="h6"
                align="center"
                sx={{
                    color: '#6b7280',
                    fontWeight: 500,
                }}
            >
                {message || 'Nenhum dado encontrado'}
            </Typography>
            <Typography
                variant="body2"
                align="center"
                sx={{
                    color: '#9ca3af',
                }}
            >
                Comece adicionando novos itens
            </Typography>
        </Box>
    );
}