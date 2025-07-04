import { Card, CardMedia } from "@mui/material";


interface CardProductsProps {
    image: string;
    description: string;
}
export default function CardProducts({image, description} : CardProductsProps) {
    return (
        <Card className="">
            <CardMedia src={image} className="w-[200px] h-[200px]"/>
            <p>{description}</p>
        </Card>
    )
}