'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { CategoriaCardapio } from '@/app/data/service/CardapioService';

interface CategoryNavProps {
    categories: CategoriaCardapio[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
    const [activeTab, setActiveTab] = useState(0);
    const isManualScrolling = useRef(false);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-120px 0px -80% 0px', // Adjusted to match sticky heights
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            if (isManualScrolling.current) return;

            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const catId = parseInt(id.replace('cat-', ''));
                    const index = categories.findIndex((c) => c.id === catId);
                    if (index !== -1) {
                        setActiveTab(index);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        categories.forEach((category) => {
            const element = document.getElementById(`cat-${category.id}`);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [categories]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
        const category = categories[newValue];
        const element = document.getElementById(`cat-${category.id}`);

        if (element) {
            isManualScrolling.current = true;
            const yOffset = -120; // Header(64) + Nav(approx 50) + Buffer
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });

            // Reset manual scroll flag after animation
            setTimeout(() => {
                isManualScrolling.current = false;
            }, 800);
        }
    };

    return (
        <Paper
            elevation={2}
            sx={{
                position: 'sticky',
                top: 64, // Just below ClientHeader (which is 64px)
                zIndex: 10,
                borderRadius: 0,
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
            }}
        >
            <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="categorias do cardápio"
                    sx={{
                        '& .MuiTabs-indicator': {
                            height: 3,
                            borderRadius: '3px 3px 0 0',
                        },
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '0.95rem',
                            minWidth: 'auto',
                            px: 3,
                            py: 2,
                        },
                    }}
                >
                    {categories.map((category) => (
                        <Tab key={category.id} label={category.name} />
                    ))}
                </Tabs>
            </Box>
        </Paper>
    );
}
