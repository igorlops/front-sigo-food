import { Button } from "@mui/material"
import { useState } from "react";

interface ButtonCreateNewProps {
    description: string;
    handleViewForm: () => void;
}

export default function ButtonCreateNew({ description, handleViewForm}:ButtonCreateNewProps) {
    return (
        <Button variant="contained" onClick={handleViewForm}>
            {description}
        </Button>
    )
}