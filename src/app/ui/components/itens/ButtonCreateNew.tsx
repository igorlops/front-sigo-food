import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

interface ButtonCreateNewProps {
    description: string;
    handleViewForm: () => void;
}

const colors = {
    primaryBlue: '#1e3a8a',
    accentYellow: '#fcd34d',
};

export default function ButtonCreateNew({ description, handleViewForm }: ButtonCreateNewProps) {
    return (
        <Button
            variant="contained"
            onClick={handleViewForm}
            startIcon={<Add />}
            sx={{
                bgcolor: colors.primaryBlue,
                color: 'white',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(30, 58, 138, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    bgcolor: colors.accentYellow,
                    color: colors.primaryBlue,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(252, 211, 77, 0.3)',
                },
            }}
        >
            {description}
        </Button>
    );
}