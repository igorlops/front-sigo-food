import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface CardProductsProps {
    image: string;
    description: string;
}

export default function CardProducts({ image, description }: CardProductsProps) {
    return (
        <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                src={image}
                alt={description}
                sx={{ width: 200, height: 200, objectFit: 'cover', alignSelf: 'center' }}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" align="center">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}