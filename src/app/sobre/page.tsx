'use client';
import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Chip,
    AppBar,
    Toolbar,
    Box
} from '@mui/material';
import {
    Smartphone,
    ArrowLeft,
    Target,
    Eye,
    Heart,
    Users,
    Zap,
    Shield,
    TrendingUp,
    Award,
    Clock,
    HeadphonesIcon,
    Rocket
} from 'lucide-react';
import Link from 'next/link';

const colors = {
    primaryBlue: '#1e3a8a',
    accentYellow: '#fcd34d',
};

export default function SobrePage() {
    const values = [
        {
            icon: <Target className="w-10 h-10" />,
            title: 'Foco no Cliente',
            description: 'Desenvolvemos soluções pensando nas necessidades reais dos donos de restaurantes.',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: <Zap className="w-10 h-10" />,
            title: 'Inovação Constante',
            description: 'Atualizamos nossa plataforma regularmente com novas funcionalidades e melhorias.',
            color: 'from-amber-400 to-amber-500'
        },
        {
            icon: <Shield className="w-10 h-10" />,
            title: 'Transparência',
            description: 'Sem taxas escondidas, sem letras miúdas. Preços justos e claros para todos.',
            color: 'from-green-500 to-green-600'
        },
        {
            icon: <Heart className="w-10 h-10" />,
            title: 'Paixão pelo Negócio',
            description: 'Acreditamos no poder da gastronomia e trabalhamos para facilitar a vida de quem empreende.',
            color: 'from-pink-500 to-pink-600'
        }
    ];

    const stats = [
        { value: '+1.200', label: 'Restaurantes Ativos', icon: <Users /> },
        { value: '+150k', label: 'Pedidos por Mês', icon: <TrendingUp /> },
        { value: '4.9/5', label: 'Avaliação Média', icon: <Award /> },
        { value: '99.9%', label: 'Uptime', icon: <Clock /> }
    ];

    const team = [
        {
            name: 'Equipe de Produto',
            description: 'Especialistas que entendem do mercado de food service e desenvolvem features que realmente fazem diferença.',
            icon: <Rocket className="w-8 h-8" />,
            color: 'from-purple-500 to-purple-600'
        },
        {
            name: 'Suporte Técnico',
            description: 'Time dedicado a responder suas dúvidas e resolver problemas rapidamente, 24 horas por dia.',
            icon: <HeadphonesIcon className="w-8 h-8" />,
            color: 'from-blue-500 to-blue-600'
        },
        {
            name: 'Desenvolvimento',
            description: 'Engenheiros de software focados em criar uma plataforma rápida, segura e confiável.',
            icon: <Zap className="w-8 h-8" />,
            color: 'from-amber-400 to-amber-500'
        }
    ];

    return (
        <>
            {/* Navbar */}
            <AppBar position="sticky" elevation={0} sx={{ backgroundColor: colors.primaryBlue }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters className="flex justify-between py-2">
                        <Link href="/" className="flex items-center gap-2 no-underline">
                            <div className="bg-amber-300 p-1.5 rounded-lg hover:scale-105 transition-transform">
                                <Smartphone className="text-blue-900 w-6 h-6" />
                            </div>
                            <Typography variant="h6" component="div" className="font-bold tracking-tight text-white">
                                SIGO <span className="text-amber-300">FOOD</span>
                            </Typography>
                        </Link>

                        <Link href="/" passHref>
                            <Button
                                startIcon={<ArrowLeft size={18} />}
                                sx={{
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': { color: colors.accentYellow }
                                }}
                            >
                                Voltar
                            </Button>
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 py-20">
                <Container maxWidth="lg">
                    <div className="text-center max-w-4xl mx-auto">
                        <Chip
                            label="SOBRE NÓS"
                            sx={{
                                bgcolor: 'rgba(252, 211, 77, 0.2)',
                                color: colors.accentYellow,
                                fontWeight: 700,
                                mb: 3
                            }}
                        />
                        <Typography
                            variant="h1"
                            className="text-white font-extrabold mb-6"
                            sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
                        >
                            Transformando a <span className="text-amber-300">Gastronomia</span> Digital
                        </Typography>
                        <Typography variant="h6" className="text-blue-100 leading-relaxed max-w-3xl mx-auto">
                            Somos uma empresa de tecnologia apaixonada por ajudar restaurantes a crescerem.
                            Nossa missão é simplificar a gestão e aumentar as vendas do seu negócio.
                        </Typography>
                    </div>
                </Container>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-white">
                <Container maxWidth="lg">
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={6}>
                            <Card className="h-full shadow-lg rounded-3xl border border-stone-100 overflow-hidden">
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                                <CardContent className="p-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mb-6 shadow-lg">
                                        <Target className="w-10 h-10" />
                                    </div>
                                    <Typography variant="h3" className="font-bold text-stone-900 mb-4">
                                        Nossa Missão
                                    </Typography>
                                    <Typography variant="body1" className="text-stone-600 leading-relaxed text-lg">
                                        Democratizar a tecnologia para restaurantes de todos os tamanhos, oferecendo
                                        ferramentas poderosas e acessíveis que aumentam vendas, melhoram a experiência
                                        do cliente e simplificam a gestão do dia a dia.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card className="h-full shadow-lg rounded-3xl border border-stone-100 overflow-hidden">
                                <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-500"></div>
                                <CardContent className="p-8">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white mb-6 shadow-lg">
                                        <Eye className="w-10 h-10" />
                                    </div>
                                    <Typography variant="h3" className="font-bold text-stone-900 mb-4">
                                        Nossa Visão
                                    </Typography>
                                    <Typography variant="body1" className="text-stone-600 leading-relaxed text-lg">
                                        Ser a plataforma de gestão número 1 para restaurantes no Brasil, reconhecida
                                        pela facilidade de uso, inovação constante e pelo impacto positivo nos resultados
                                        dos nossos clientes.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </section>

            {/* Values */}
            <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
                <Container maxWidth="lg">
                    <div className="text-center mb-16">
                        <Typography variant="h2" className="font-bold text-stone-900 mb-4">
                            Nossos <span className="text-blue-900">Valores</span>
                        </Typography>
                        <Typography variant="body1" className="text-stone-600 max-w-2xl mx-auto">
                            Os princípios que guiam todas as nossas decisões e ações
                        </Typography>
                    </div>

                    <Grid container spacing={4}>
                        {values.map((value, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card className="h-full hover:shadow-2xl transition-all duration-300 rounded-2xl border border-stone-100 group hover:-translate-y-2">
                                    <CardContent className="p-6 text-center">
                                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                            {value.icon}
                                        </div>
                                        <Typography variant="h6" className="font-bold text-stone-900 mb-3">
                                            {value.title}
                                        </Typography>
                                        <Typography variant="body2" className="text-stone-600 leading-relaxed">
                                            {value.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </section>

            {/* Stats */}
            <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-900">
                <Container maxWidth="lg">
                    <div className="text-center mb-12">
                        <Typography variant="h2" className="font-bold text-white mb-4">
                            Números que <span className="text-amber-300">Importam</span>
                        </Typography>
                        <Typography variant="body1" className="text-blue-100 max-w-2xl mx-auto">
                            Resultados que comprovam nosso compromisso com a excelência
                        </Typography>
                    </div>

                    <Grid container spacing={4}>
                        {stats.map((stat, index) => (
                            <Grid item xs={6} md={3} key={index}>
                                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl hover:bg-white/20 transition-all hover:scale-105">
                                    <CardContent className="p-6 text-center">
                                        <div className="text-amber-300 flex justify-center mb-3">
                                            {React.cloneElement(stat.icon, { size: 32 })}
                                        </div>
                                        <Typography variant="h3" className="font-bold text-white mb-2">
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" className="text-blue-200 uppercase tracking-wide text-xs">
                                            {stat.label}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </section>

            {/* Team */}
            <section className="py-20 bg-white">
                <Container maxWidth="lg">
                    <div className="text-center mb-16">
                        <Typography variant="h2" className="font-bold text-stone-900 mb-4">
                            Nosso <span className="text-blue-900">Time</span>
                        </Typography>
                        <Typography variant="body1" className="text-stone-600 max-w-2xl mx-auto">
                            Profissionais dedicados a fazer sua experiência ser a melhor possível
                        </Typography>
                    </div>

                    <Grid container spacing={4}>
                        {team.map((member, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card className="h-full shadow-lg hover:shadow-2xl transition-all rounded-2xl border border-stone-100 hover:-translate-y-2">
                                    <CardContent className="p-8 text-center">
                                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} text-white mb-6 shadow-lg`}>
                                            {member.icon}
                                        </div>
                                        <Typography variant="h5" className="font-bold text-stone-900 mb-3">
                                            {member.name}
                                        </Typography>
                                        <Typography variant="body2" className="text-stone-600 leading-relaxed">
                                            {member.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </section>

            {/* History/Story */}
            <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
                <Container maxWidth="md">
                    <div className="text-center mb-12">
                        <Typography variant="h2" className="font-bold text-stone-900 mb-4">
                            Nossa <span className="text-blue-900">História</span>
                        </Typography>
                    </div>

                    <div className="space-y-8">
                        <Card className="shadow-lg rounded-2xl border border-stone-100">
                            <CardContent className="p-8">
                                <Typography variant="h5" className="font-bold text-blue-900 mb-4">
                                    Como Tudo Começou
                                </Typography>
                                <Typography variant="body1" className="text-stone-700 leading-relaxed mb-4">
                                    O SIGO FOOD nasceu da frustração de ver restaurantes incríveis lutando com
                                    sistemas caros, complicados e que cobravam taxas abusivas sobre cada venda.
                                </Typography>
                                <Typography variant="body1" className="text-stone-700 leading-relaxed">
                                    Em 2024, decidimos criar uma solução diferente: uma plataforma completa,
                                    fácil de usar e com preço justo, que permitisse qualquer restaurante -
                                    pequeno ou grande - ter acesso à melhor tecnologia.
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg rounded-2xl border border-stone-100">
                            <CardContent className="p-8">
                                <Typography variant="h5" className="font-bold text-blue-900 mb-4">
                                    Hoje
                                </Typography>
                                <Typography variant="body1" className="text-stone-700 leading-relaxed mb-4">
                                    Hoje, mais de 1.200 restaurantes confiam no SIGO FOOD para gerenciar seu
                                    dia a dia. Processamos mais de 150 mil pedidos por mês e continuamos crescendo.
                                </Typography>
                                <Typography variant="body1" className="text-stone-700 leading-relaxed">
                                    Mas nosso maior orgulho não são os números - é saber que estamos fazendo
                                    a diferença no sucesso de cada um dos nossos clientes.
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-900">
                <Container maxWidth="md" className="text-center">
                    <Typography variant="h2" className="text-white font-bold mb-6" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                        Faça parte dessa história
                    </Typography>
                    <Typography variant="h6" className="text-blue-100 mb-8">
                        Junte-se a mais de 1.200 restaurantes que escolheram o SIGO FOOD
                    </Typography>
                    <Link href="/login" passHref style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: colors.accentYellow,
                                color: colors.primaryBlue,
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                px: 5,
                                py: 2,
                                borderRadius: '12px',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#fbbf24',
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            Começar Grátis Agora
                        </Button>
                    </Link>
                </Container>
            </section>

            {/* Footer */}
            <footer className="bg-stone-900 text-stone-400 py-8 text-center">
                <Container>
                    <Typography variant="body2">
                        © 2026 SIGO FOOD Tecnologia LTDA. Todos os direitos reservados.
                    </Typography>
                </Container>
            </footer>
        </>
    );
}
