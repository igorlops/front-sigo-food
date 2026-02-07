'use client';
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Container,
    Typography,
    IconButton
} from '@mui/material';
import {
    Menu as MenuIcon,
    Smartphone,
    X
} from 'lucide-react';
import Link from 'next/link';

const colors = {
    primaryBlue: '#1e3a8a',
    accentYellow: '#fcd34d',
};

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <AppBar position="sticky" elevation={0} sx={{ backgroundColor: colors.primaryBlue, borderBottom: '1px solid rgba(252, 211, 77, 0.1)' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters className="flex justify-between py-2">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 no-underline">
                        <div className="bg-amber-300 p-1.5 rounded-lg hover:scale-105 transition-transform duration-300">
                            <Smartphone className="text-blue-900 w-6 h-6" />
                        </div>
                        <Typography variant="h6" component="div" className="font-bold tracking-tight text-white">
                            SIGO <span className="text-amber-300">FOOD</span>
                        </Typography>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-6 items-center">
                        <Link href="/funcionalidades" passHref>
                            <Button className="text-gray-200 hover:text-amber-300 normal-case font-medium transition-colors duration-300">
                                Funcionalidades
                            </Button>
                        </Link>
                        <Link href="/planos" passHref>
                            <Button className="text-gray-200 hover:text-amber-300 normal-case font-medium transition-colors duration-300">
                                Planos
                            </Button>
                        </Link>
                        <Link href="/sobre" passHref>
                            <Button className="text-gray-200 hover:text-amber-300 normal-case font-medium transition-colors duration-300">
                                Sobre
                            </Button>
                        </Link>
                        <Link href="/login" passHref>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: colors.accentYellow,
                                    color: colors.primaryBlue,
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    px: 3,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: '#fbbf24',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(252, 211, 77, 0.4)'
                                    }
                                }}
                            >
                                Entrar no Sistema
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <IconButton onClick={toggleMobileMenu} className="text-white">
                            {mobileMenuOpen ? <X /> : <MenuIcon />}
                        </IconButton>
                    </div>
                </Toolbar>
            </Container>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-blue-900 border-t border-blue-800 px-4 py-4 flex flex-col gap-3 animate-fade-in">
                    <Link href="/funcionalidades" passHref>
                        <Button fullWidth className="justify-start text-white normal-case" onClick={toggleMobileMenu}>
                            Funcionalidades
                        </Button>
                    </Link>
                    <Link href="/planos" passHref>
                        <Button fullWidth className="justify-start text-white normal-case" onClick={toggleMobileMenu}>
                            Planos
                        </Button>
                    </Link>
                    <Link href="/sobre" passHref>
                        <Button fullWidth className="justify-start text-white normal-case" onClick={toggleMobileMenu}>
                            Sobre
                        </Button>
                    </Link>
                    <Link href="/login" passHref>
                        <Button fullWidth variant="contained" sx={{ bgcolor: colors.accentYellow, color: colors.primaryBlue }}>
                            Entrar / Cadastrar
                        </Button>
                    </Link>
                </div>
            )}
        </AppBar>
    );
}
