'use client';

import React from 'react';
import { RestauranteInfo } from '@/app/data/service/CardapioService';
import { Box, Typography, Avatar, Fade } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

export default function ClientHero({ info }: { info: RestauranteInfo }) {
    // Fallback banner
    const bannerImage = info.banner_path ? `url(${info.banner_path})` : undefined;
    const bannerColor = info.banner_path ? undefined : 'primary.main';

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '50vh',
                minHeight: 400,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.900' // Fallback base color
            }}
        >
            {/* Background Image/Color */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: bannerImage,
                    backgroundColor: bannerColor,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)'
                    }
                }}
            />

            {/* Content */}
            <Fade in={true} timeout={1000}>
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 10,
                        textAlign: 'center',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    {info.logo_path && (
                        <Avatar
                            src={info.logo_path}
                            alt={`${info.name} Logo`}
                            sx={{
                                width: { xs: 96, md: 128 },
                                height: { xs: 96, md: 128 },
                                mb: 2,
                                border: '4px solid white',
                                boxShadow: 3
                            }}
                        />
                    )}

                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            mb: 1,
                            textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
                            fontSize: { xs: '2rem', md: '3rem' }
                        }}
                    >
                        {info.name}
                    </Typography>

                    {info.description && (
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'rgba(255,255,255,0.9)',
                                maxWidth: 'sm',
                                mx: 'auto',
                                fontSize: { xs: '0.9rem', md: '1.1rem' },
                                fontWeight: 300
                            }}
                        >
                            {info.description}
                        </Typography>
                    )}

                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: -60, // Adjust based on parent padding/height
                            left: '50%',
                            transform: 'translateX(-50%)',
                            animation: 'bounce 2s infinite',
                            '@keyframes bounce': {
                                '0%, 20%, 50%, 80%, 100%': { transform: 'translate(-50%, 0)' },
                                '40%': { transform: 'translate(-50%, -10px)' },
                                '60%': { transform: 'translate(-50%, -5px)' }
                            }
                        }}
                    >
                        <ExpandMoreIcon sx={{ color: 'white', fontSize: 40, opacity: 0.8 }} />
                    </Box>
                </Box>
            </Fade>
        </Box>
    );
}
