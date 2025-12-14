'use client';

import React from 'react';
import { RestauranteInfo } from '@/app/data/service/CardapioService';
import { Box, Grid, Typography, Paper, Link } from '@mui/material';
import {
    LocationOn as LocationIcon,
    AccessTime as TimeIcon,
    Phone as PhoneIcon,
    WhatsApp as WhatsAppIcon
} from '@mui/icons-material';

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    color: string;
    bgColor: string;
}

function InfoCard({ icon, title, children, color, bgColor }: InfoCardProps) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                }
            }}
        >
            <Box
                sx={{
                    p: 2,
                    borderRadius: '50%',
                    mb: 2,
                    color: color,
                    bgcolor: bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {icon}
            </Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Box color="text.secondary" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {children}
            </Box>
        </Paper>
    );
}

export default function InfoSection({ info }: { info: RestauranteInfo }) {
    if (!info.address && !info.phone && !info.opening_hours) return null;

    return (
        <Grid container spacing={4}>
            {/* Endereço */}
            {info.address && (
                <Grid item xs={12} md={4}>
                    <InfoCard
                        icon={<LocationIcon fontSize="large" />}
                        title="Localização"
                        color="#dc2626"
                        bgColor="#fef2f2"
                    >
                        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                            {info.address}
                        </Typography>
                    </InfoCard>
                </Grid>
            )}

            {/* Horário */}
            {info.opening_hours && (
                <Grid item xs={12} md={4}>
                    <InfoCard
                        icon={<TimeIcon fontSize="large" />}
                        title="Funcionamento"
                        color="#16a34a"
                        bgColor="#f0fdf4"
                    >
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                            {info.opening_hours}
                        </Typography>
                    </InfoCard>
                </Grid>
            )}

            {/* Contato */}
            {(info.phone || info.whatsapp) && (
                <Grid item xs={12} md={4}>
                    <InfoCard
                        icon={<PhoneIcon fontSize="large" />}
                        title="Fale Conosco"
                        color="#2563eb"
                        bgColor="#eff6ff"
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {info.whatsapp && (
                                <Link
                                    href={`https://wa.me/${info.whatsapp.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    underline="hover"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1,
                                        color: 'text.secondary',
                                        '&:hover': { color: '#16a34a' }
                                    }}
                                >
                                    <WhatsAppIcon fontSize="small" />
                                    <Typography variant="body2" fontWeight="medium">
                                        {info.whatsapp}
                                    </Typography>
                                </Link>
                            )}
                            {info.phone && (
                                <Link
                                    href={`tel:${info.phone}`}
                                    underline="hover"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1,
                                        color: 'text.secondary',
                                        '&:hover': { color: '#2563eb' }
                                    }}
                                >
                                    <PhoneIcon fontSize="small" />
                                    <Typography variant="body2" fontWeight="medium">
                                        {info.phone}
                                    </Typography>
                                </Link>
                            )}
                        </Box>
                    </InfoCard>
                </Grid>
            )}
        </Grid>
    );
}
