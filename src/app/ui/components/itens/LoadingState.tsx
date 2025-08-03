import { Box, CircularProgress, Typography } from "@mui/material";

export function LoadingState() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
        </Box>
    )
}
export function ErrorState() {
    return (
         <Typography component="p" color="error" align="center" sx={{ my: 4 }}>
            Não foi possível carregar os produtos. Tente novamente mais tarde.
        </Typography>
    )
}