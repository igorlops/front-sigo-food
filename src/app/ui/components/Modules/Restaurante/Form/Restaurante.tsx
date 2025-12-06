'use client';

import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import { buscaMeuRestaurante, atualizaRestaurante } from "@/app/data/service/RestauranteService";
import { UserLocalStorage } from "@/app/data/utils/const/User";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FormRestauranteProps {
    onSuccess: () => void;
}

export default function RestauranteForm({ onSuccess }: FormRestauranteProps) {
    const [restaurantId, setRestaurantId] = useState<number | null>(null);
    const [name, setName] = useState<string>('');
    const [contact_email, setContactEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [kitchen_type, setKitchenType] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [logo_path, setLogoPath] = useState<File | null>(null);
    const [primary_color, setPrimaryColor] = useState<string>('#1e3a8a');
    const [secondary_color, setSecondaryColor] = useState<string>('#fcd34d');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const userLocalStorage = UserLocalStorage();

    useEffect(() => {
        fetchRestaurante();
    }, []);

    const fetchRestaurante = async () => {
        try {
            setLoading(true);
            const response = await buscaMeuRestaurante();
            if (response?.data.data) {
                const restaurant = response.data.data;
                setRestaurantId(restaurant.id);
                setName(restaurant.name);
                setContactEmail(restaurant.contact_email);
                setPhone(restaurant.phone);
                setKitchenType(restaurant.kitchen_type);
                setSlug(restaurant.slug);
                setPrimaryColor(restaurant.primary_color || '#1e3a8a');
                setSecondaryColor(restaurant.secondary_color || '#fcd34d');
            }
        } catch (err) {
            console.error('Erro ao buscar restaurante:', err);
            setError('Erro ao buscar dados do restaurante');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!restaurantId) {
            setError('Restaurante não encontrado.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('contact_email', contact_email);
        formData.append('phone', phone);
        formData.append('kitchen_type', kitchen_type);
        formData.append('slug', slug);
        formData.append('primary_color', primary_color);
        formData.append('secondary_color', secondary_color);

        if (logo_path) {
            formData.append('logo_path', logo_path);
        }

        try {
            const response = await atualizaRestaurante(restaurantId, formData);

            if (!response?.data.error) {
                onSuccess();
            }
        } catch (error) {
            console.error(error);
            setError('Erro ao atualizar restaurante.');
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    if (loading) {
        return (
            <Box className="flex justify-center items-center p-10">
                <Typography>Carregando...</Typography>
            </Box>
        );
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className="px-10 py-10 rounded-xl flex flex-col gap-6 max-w-[600px] bg-gray-100"
        >
            <Typography variant="h5" className="text-blue-900 font-bold">
                Configurações do Restaurante
            </Typography>

            {error && (
                <Typography variant="body2" color="error">
                    {error}
                </Typography>
            )}

            <TextField
                className="w-full"
                label="Nome do Restaurante"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <TextField
                className="w-full"
                label="E-mail de Contato"
                variant="outlined"
                type="email"
                value={contact_email}
                onChange={(e) => setContactEmail(e.target.value)}
                required
            />

            <TextField
                className="w-full"
                label="Telefone"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                helperText="Ex: (11) 99999-9999"
            />

            <TextField
                className="w-full"
                label="Tipo de Cozinha"
                variant="outlined"
                value={kitchen_type}
                onChange={(e) => setKitchenType(e.target.value)}
                required
                helperText="Ex: Italiana, Brasileira, Japonesa"
            />

            <TextField
                className="w-full"
                label="Slug (URL amigável)"
                variant="outlined"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                required
                helperText="Ex: meu-restaurante (usado na URL)"
            />

            <Box className="flex gap-4">
                <Box className="flex-1">
                    <Typography variant="body2" className="mb-2">Cor Primária</Typography>
                    <input
                        type="color"
                        value={primary_color}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-full h-12 rounded cursor-pointer"
                    />
                </Box>

                <Box className="flex-1">
                    <Typography variant="body2" className="mb-2">Cor Secundária</Typography>
                    <input
                        type="color"
                        value={secondary_color}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-full h-12 rounded cursor-pointer"
                    />
                </Box>
            </Box>

            <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                className="w-full"
            >
                {logo_path ? logo_path.name : 'Upload Logo'}
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) setLogoPath(file);
                    }}
                />
            </Button>

            <Button type="submit" variant="contained" color="primary" className="w-full">
                Atualizar Restaurante
            </Button>
        </Box>
    );
}
