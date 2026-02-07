'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Stack,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChefHat,
  QrCode,
  Smartphone,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  X,
  Instagram,
  Facebook,
  Linkedin,
  LineChart,
  Users,
  ShoppingBag,
  BarChart3,
  Clock,
  Zap,
  ShieldCheck,
  Star,
  Utensils,
  CreditCard,
  Wifi
} from 'lucide-react';
import Link from 'next/link';

// Configuração de Cores da Identidade Visual
const colors = {
  primaryBlue: '#1e3a8a',
  darkBlue: '#1e40af',
  accentYellow: '#fcd34d',
  secondaryStone: '#44403c',
  bgLight: '#fcfcfc',
};

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-stone-800 overflow-x-hidden">

      {/* NAVBAR */}
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: colors.primaryBlue, borderBottom: '1px solid rgba(252, 211, 77, 0.1)' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters className="flex justify-between py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 no-underline">
              <div className="bg-amber-300 p-1.5 rounded-lg hover:scale-105 transition-transform">
                <Smartphone className="text-blue-900 w-6 h-6" />
              </div>
              <Typography variant="h6" component="div" className="font-bold tracking-tight text-white">
                SIGO <span className="text-amber-300">FOOD</span>
              </Typography>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">
              <Link href="/funcionalidades" passHref>
                <Button className="text-gray-200 hover:text-amber-300 normal-case font-medium">
                  Funcionalidades
                </Button>
              </Link>
              <Link href="/planos" passHref>
                <Button className="text-gray-200 hover:text-amber-300 normal-case font-medium">
                  Planos
                </Button>
              </Link>
              <Link href="/sobre" passHref>
                <Button className="text-gray-200 hover:text-amber-300 normal-case font-medium">
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
                    '&:hover': { bgcolor: '#fbbf24', transform: 'translateY(-2px)' },
                    transition: 'all 0.3s'
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
          <div className="md:hidden bg-blue-900 border-t border-blue-800 px-4 py-4 flex flex-col gap-3">
            <Link href="/funcionalidades" passHref>
              <Button fullWidth className="justify-start text-white normal-case">Funcionalidades</Button>
            </Link>
            <Link href="/planos" passHref>
              <Button fullWidth className="justify-start text-white normal-case">Planos</Button>
            </Link>
            <Link href="/sobre" passHref>
              <Button fullWidth className="justify-start text-white normal-case">Sobre</Button>
            </Link>
            <Link href="/login" passHref>
              <Button fullWidth variant="contained" sx={{ bgcolor: colors.accentYellow, color: colors.primaryBlue }}>
                Entrar / Cadastrar
              </Button>
            </Link>
          </div>
        )}
      </AppBar>

      {/* HERO SECTION - Modernizado */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 pt-16 pb-20 lg:pt-24 lg:pb-32">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-300 rounded-full opacity-5 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full opacity-10 blur-[100px]"></div>

        <Container maxWidth="lg" className="relative z-10">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <div className="space-y-6 text-center md:text-left">
                <Chip
                  icon={<Zap size={16} className="text-amber-300" />}
                  label="A plataforma mais completa para restaurantes"
                  sx={{
                    bgcolor: 'rgba(30, 58, 138, 0.5)',
                    color: colors.accentYellow,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(252, 211, 77, 0.2)'
                  }}
                />

                <Typography
                  variant="h1"
                  className="text-white font-extrabold leading-tight"
                  sx={{ fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' } }}
                >
                  Transforme Seu
                  <br />
                  <span className="text-amber-300">Restaurante Digital</span>
                </Typography>

                <Typography variant="h6" className="text-blue-100 font-light leading-relaxed max-w-xl">
                  Sistema completo de gestão com <strong className="text-white">cardápio QR Code</strong>,
                  controle de pedidos, gestão de mesas e <strong className="text-white">analytics em tempo real</strong>.
                  Tudo que você precisa em uma única plataforma.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="pt-4">
                  <Link href="/login" passHref style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowRight size={20} />}
                      sx={{
                        bgcolor: colors.accentYellow,
                        color: colors.primaryBlue,
                        fontWeight: '800',
                        fontSize: '1.1rem',
                        padding: '14px 36px',
                        borderRadius: '12px',
                        textTransform: 'none',
                        boxShadow: '0 10px 40px rgba(252, 211, 77, 0.3)',
                        '&:hover': {
                          bgcolor: '#fbbf24',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 15px 50px rgba(252, 211, 77, 0.4)'
                        },
                        transition: 'all 0.3s'
                      }}
                    >
                      Começar Grátis
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => scrollToSection('features')}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.3)',
                      padding: '14px 36px',
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: colors.accentYellow,
                        bgcolor: 'rgba(252, 211, 77, 0.1)',
                        transform: 'translateY(-3px)'
                      },
                      transition: 'all 0.3s'
                    }}
                  >
                    Ver Funcionalidades
                  </Button>
                </Stack>

                <div className="pt-6 flex items-center gap-6 justify-center md:justify-start flex-wrap">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-400" />
                    <span className="text-sm text-blue-200">Sem cartão de crédito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-400" />
                    <span className="text-sm text-blue-200">Setup em 5 minutos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-400" />
                    <span className="text-sm text-blue-200">Suporte 24/7</span>
                  </div>
                </div>
              </div>
            </Grid>

            {/* Hero Mockup - Aprimorado */}
            <Grid item xs={12} md={6}>
              <div className="relative mx-auto max-w-[400px] md:max-w-none">
                <div className="relative z-10 bg-stone-900 border-[10px] border-stone-800 rounded-[3rem] overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
                  <div className="bg-stone-800 h-8 w-40 mx-auto rounded-b-2xl absolute top-0 left-1/2 -translate-x-1/2 z-20"></div>

                  <div className="h-[650px] bg-gradient-to-b from-white to-stone-50 w-full overflow-hidden flex flex-col relative">
                    {/* App Header com gradiente */}
                    <div className="bg-gradient-to-br from-amber-300 to-amber-400 h-44 p-6 pt-14 flex flex-col justify-end relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <h3 className="font-bold text-blue-900 text-2xl relative z-10">Burguer Prime</h3>
                      <p className="text-blue-800 text-sm flex items-center gap-2 relative z-10">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Aberto • ⭐ 4.9 (328 avaliações)
                      </p>
                    </div>

                    {/* App Body */}
                    <div className="p-5 space-y-4 overflow-y-auto flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-bold text-stone-800 text-lg">Mais Pedidos</div>
                        <Chip label="Ver Cardápio" size="small" sx={{ bgcolor: 'rgba(30, 58, 138, 0.1)', color: colors.primaryBlue, fontWeight: 600 }} />
                      </div>

                      {[
                        { name: 'X-Bacon Supreme', desc: 'Dupla carne, bacon crocante, queijo...', price: '32,90', popular: true },
                        { name: 'Smash Burger', desc: 'Carne smash, cheddar, cebola crispy...', price: '28,50', popular: false },
                        { name: 'Mega Picanha', desc: 'Picanha premium, molho especial...', price: '38,90', popular: true }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow items-center relative overflow-hidden group">
                          {item.popular && (
                            <div className="absolute top-2 right-2">
                              <Star size={14} className="text-amber-500 fill-amber-500" />
                            </div>
                          )}
                          <div className="w-20 h-20 bg-gradient-to-br from-stone-100 to-stone-200 rounded-xl flex-shrink-0 relative overflow-hidden">
                            <div className="absolute inset-0 bg-amber-300 opacity-20"></div>
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-stone-900 text-sm">{item.name}</div>
                            <div className="text-xs text-stone-500 mt-0.5">{item.desc}</div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-blue-900 font-bold text-base">R$ {item.price}</span>
                              <div className="w-7 h-7 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full flex items-center justify-center text-blue-900 text-sm font-bold shadow-md hover:scale-110 transition-transform cursor-pointer">
                                +
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Floating Cart Button - Melhorado */}
                    <div className="absolute bottom-6 left-5 right-5 bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 rounded-2xl flex justify-between items-center shadow-2xl backdrop-blur-lg border border-blue-700">
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-700 px-2.5 py-1 rounded-lg text-sm font-bold">3</span>
                        <span className="font-semibold">Ver Sacola</span>
                      </div>
                      <span className="font-bold text-lg">R$ 100,30</span>
                    </div>
                  </div>
                </div>

                {/* Decorative elements - Aprimorados */}
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob"></div>
                <div className="absolute -top-8 -right-8 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
              </div>
            </Grid>
          </Grid>
        </Container>

        {/* Stats Bar */}
        <Container maxWidth="lg" className="relative z-10 mt-16">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
            <Grid container spacing={4} className="text-center">
              <Grid item xs={6} md={3}>
                <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-1">+1.2k</div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">Restaurantes</div>
              </Grid>
              <Grid item xs={6} md={3}>
                <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-1">+150k</div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">Pedidos/Mês</div>
              </Grid>
              <Grid item xs={6} md={3}>
                <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-1">R$ 0</div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">Taxa por Venda</div>
              </Grid>
              <Grid item xs={6} md={3}>
                <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-1">4.9★</div>
                <div className="text-blue-200 text-sm uppercase tracking-wide">Avaliação</div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </section>

      {/* FEATURES SECTION - Completamente redesenhado */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-stone-50">
        <Container maxWidth="lg">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Chip
              label="RECURSOS COMPLETOS"
              sx={{
                bgcolor: 'rgba(30, 58, 138, 0.1)',
                color: colors.primaryBlue,
                fontWeight: 700,
                mb: 2
              }}
            />
            <Typography variant="h2" className="mt-3 font-bold text-stone-900" sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}>
              Tudo que seu <span className="text-blue-900">restaurante</span> precisa
            </Typography>
            <Typography variant="body1" className="mt-4 text-stone-600 text-lg">
              Funcionalidades pensadas para aumentar suas vendas e simplificar a gestão do seu negócio
            </Typography>
          </div>

          <Grid container spacing={4}>
            {[
              {
                icon: <QrCode className="w-12 h-12" />,
                title: "Cardápio QR Code",
                desc: "Cliente escaneia e faz o pedido direto do celular. Sem filas, sem espera, sem erros de anotação.",
                color: "from-amber-400 to-amber-500"
              },
              {
                icon: <Utensils className="w-12 h-12" />,
                title: "Gestão de Mesas",
                desc: "Controle de ocupação em tempo real, abertura e fechamento de comandas com histórico completo.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <ShoppingBag className="w-12 h-12" />,
                title: "Gestão de Produtos",
                desc: "Adicione fotos, descrições, preços, categorias. Pause produtos esgotados em 1 clique.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: <BarChart3 className="w-12 h-12" />,
                title: "Dashboard Analytics",
                desc: "Veja seus pratos mais vendidos, horários de pico, ticket médio e faturamento em tempo real.",
                color: "from-green-500 to-green-600"
              },
              {
                icon: <Clock className="w-12 h-12" />,
                title: "Controle de Pedidos",
                desc: "Receba, gerencie e acompanhe todos os pedidos em um painel intuitivo. Notificações instantâneas.",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: <CreditCard className="w-12 h-12" />,
                title: "Pagamentos Integrados",
                desc: "Aceite PIX, cartão e dinheiro. Controle de pagamentos por mesa com segurança e praticidade.",
                color: "from-pink-500 to-pink-600"
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Gestão de Clientes",
                desc: "Cadastre clientes, histórico de pedidos, preferências e crie programas de fidelidade.",
                color: "from-cyan-500 to-cyan-600"
              },
              {
                icon: <Wifi className="w-12 h-12" />,
                title: "100% Online",
                desc: "Acesse de qualquer lugar, qualquer dispositivo. Seus dados sempre seguros na nuvem.",
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Card
                  elevation={0}
                  className="h-full hover:shadow-2xl transition-all duration-300 rounded-3xl border border-stone-100 group hover:-translate-y-2"
                  sx={{
                    background: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color}`}></div>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg`}>
                      {feature.icon}
                    </div>
                    <Typography variant="h6" className="font-bold text-stone-900 mb-3">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="text-stone-600 leading-relaxed flex-1">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <div className="text-center mt-12">
            <Link href="/funcionalidades" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowRight />}
                sx={{
                  borderColor: colors.primaryBlue,
                  color: colors.primaryBlue,
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: colors.primaryBlue,
                    bgcolor: 'rgba(30, 58, 138, 0.05)'
                  }
                }}
              >
                Ver Todas as Funcionalidades
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS - Renovado */}
      <section className="py-24 bg-white">
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={5}>
              <div className="space-y-6">
                <Chip
                  label="COMO FUNCIONA"
                  sx={{
                    bgcolor: 'rgba(252, 211, 77, 0.2)',
                    color: colors.primaryBlue,
                    fontWeight: 700
                  }}
                />
                <Typography variant="h3" className="font-bold text-stone-900">
                  Configure em <span className="text-blue-900">3 passos simples</span>
                </Typography>
                <Typography className="text-stone-600 text-lg leading-relaxed">
                  Não precisa ser técnico. Nossa plataforma foi desenhada para ser intuitiva e rápida.
                </Typography>

                {[
                  {
                    step: "01",
                    title: "Cadastre seu Restaurante",
                    text: "Crie sua conta em 2 minutos. Adicione logo, informações básicas e está pronto.",
                    icon: <ChefHat size={24} />
                  },
                  {
                    step: "02",
                    title: "Monte seu Cardápio",
                    text: "Adicione produtos com fotos, descrições e preços. Organize em categorias.",
                    icon: <Smartphone size={24} />
                  },
                  {
                    step: "03",
                    title: "Comece a Vender",
                    text: "Gere seu QR Code, imprima nas mesas e pronto! Seus clientes já podem pedir.",
                    icon: <TrendingUp size={24} />
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start group">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-900 font-bold text-xl rounded-2xl flex items-center justify-center border-2 border-blue-200 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-300 group-hover:to-amber-400 transition-all">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-amber-500 font-bold text-sm">{item.step}</span>
                        <Typography variant="h6" className="font-bold text-stone-900">
                          {item.title}
                        </Typography>
                      </div>
                      <Typography variant="body2" className="text-stone-600 leading-relaxed">
                        {item.text}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </Grid>

            <Grid item xs={12} md={7}>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-3xl shadow-2xl border border-stone-100">
                  <div className="bg-white rounded-2xl aspect-video w-full flex items-center justify-center relative overflow-hidden p-8">
                    {/* Dashboard Mockup */}
                    <div className="w-full h-full space-y-4">
                      {/* Header */}
                      <div className="flex justify-between items-center">
                        <div className="h-8 w-32 bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg"></div>
                        <div className="h-8 w-24 bg-amber-200 rounded-lg"></div>
                      </div>

                      {/* Stats Cards */}
                      <div className="grid grid-cols-4 gap-3">
                        <div className="h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-l-4 border-green-500"></div>
                        <div className="h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500"></div>
                        <div className="h-20 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-l-4 border-amber-500"></div>
                        <div className="h-20 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-l-4 border-purple-500"></div>
                      </div>

                      {/* Chart */}
                      <div className="bg-gradient-to-br from-stone-50 to-white rounded-xl p-4 border border-stone-100 shadow-sm">
                        <div className="h-4 w-40 bg-stone-200 rounded mb-4"></div>
                        <div className="flex gap-2 items-end h-32">
                          <div className="w-full bg-blue-100 h-1/3 rounded-t hover:bg-blue-200 transition-colors"></div>
                          <div className="w-full bg-blue-200 h-1/2 rounded-t hover:bg-blue-300 transition-colors"></div>
                          <div className="w-full bg-blue-900 h-full rounded-t relative group">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-semibold shadow-lg">
                              Pico de Vendas! 🚀
                            </div>
                          </div>
                          <div className="w-full bg-blue-300 h-2/3 rounded-t hover:bg-blue-400 transition-colors"></div>
                          <div className="w-full bg-blue-200 h-1/2 rounded-t hover:bg-blue-300 transition-colors"></div>
                          <div className="w-full bg-blue-100 h-1/4 rounded-t hover:bg-blue-200 transition-colors"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative badge */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 rotate-12 hover:rotate-0 transition-transform">
                  <ShieldCheck size={18} />
                  Dados Seguros
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-gradient-to-b from-stone-50 to-white">
        <Container maxWidth="lg">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Chip
              label="DEPOIMENTOS"
              sx={{
                bgcolor: 'rgba(30, 58, 138, 0.1)',
                color: colors.primaryBlue,
                fontWeight: 700,
                mb: 2
              }}
            />
            <Typography variant="h2" className="mt-3 font-bold text-stone-900" sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}>
              O que dizem nossos <span className="text-blue-900">clientes</span>
            </Typography>
          </div>

          <Grid container spacing={4}>
            {[
              {
                name: "Carlos Mendes",
                role: "Dono - Pizzaria Bella",
                text: "Desde que implementamos o SIGO FOOD, nossas vendas aumentaram 40%. O cardápio digital é um sucesso!",
                rating: 5
              },
              {
                name: "Ana Paula",
                role: "Gerente - Burger House",
                text: "A gestão de mesas e pedidos ficou muito mais fácil. Economizamos tempo e reduzimos erros.",
                rating: 5
              },
              {
                name: "Ricardo Silva",
                role: "Chef - Restaurante Gourmet",
                text: "Plataforma completa e fácil de usar. O suporte é excelente e sempre nos ajuda quando precisamos.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card className="h-full shadow-lg hover:shadow-2xl transition-all rounded-2xl border border-stone-100 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <Typography variant="body1" className="text-stone-700 mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </Typography>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-stone-900">{testimonial.name}</div>
                        <div className="text-sm text-stone-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* CTA FINAL - Melhorado */}
      <section className="py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-300 rounded-full opacity-5 blur-[120px]"></div>

        <Container maxWidth="md" className="text-center relative z-10">
          <Typography variant="h2" className="font-extrabold text-white mb-6" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Pronto para <span className="text-amber-300">revolucionar</span> seu restaurante?
          </Typography>
          <Typography variant="h6" className="text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Junte-se a mais de 1.200 restaurantes que já transformaram seu atendimento com o SIGO FOOD
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="justify-center mb-8">
            <Link href="/login" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight />}
                sx={{
                  bgcolor: colors.accentYellow,
                  color: colors.primaryBlue,
                  fontWeight: '800',
                  fontSize: '1.2rem',
                  padding: '16px 40px',
                  borderRadius: '14px',
                  textTransform: 'none',
                  boxShadow: '0 10px 40px rgba(252, 211, 77, 0.4)',
                  '&:hover': {
                    bgcolor: '#fbbf24',
                    transform: 'scale(1.05)',
                    boxShadow: '0 15px 50px rgba(252, 211, 77, 0.5)'
                  },
                  transition: 'all 0.3s'
                }}
              >
                Começar Grátis Agora
              </Button>
            </Link>
            <Link href="/planos" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  padding: '16px 40px',
                  borderRadius: '14px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: colors.accentYellow,
                    borderWidth: 2,
                    bgcolor: 'rgba(252, 211, 77, 0.1)',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.3s'
                }}
              >
                Ver Planos
              </Button>
            </Link>
          </Stack>

          <div className="flex items-center justify-center gap-8 flex-wrap text-blue-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-400" />
              <span>Teste grátis 14 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-400" />
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-400" />
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER - Aprimorado */}
      <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-amber-300 p-1.5 rounded-lg">
                  <Smartphone className="text-stone-900 w-5 h-5" />
                </div>
                <Typography variant="h6" className="font-bold text-white">
                  SIGO <span className="text-amber-300">FOOD</span>
                </Typography>
              </div>
              <Typography variant="body2" className="mb-6 leading-relaxed max-w-sm">
                A plataforma completa para transformar seu restaurante em um negócio digital. Gestão simplificada, vendas aumentadas.
              </Typography>
              <div className="flex gap-3">
                <IconButton
                  size="small"
                  className="bg-stone-800 hover:bg-amber-300 text-stone-400 hover:text-stone-900 transition-all"
                  sx={{ width: 40, height: 40 }}
                >
                  <Instagram size={20} />
                </IconButton>
                <IconButton
                  size="small"
                  className="bg-stone-800 hover:bg-amber-300 text-stone-400 hover:text-stone-900 transition-all"
                  sx={{ width: 40, height: 40 }}
                >
                  <Facebook size={20} />
                </IconButton>
                <IconButton
                  size="small"
                  className="bg-stone-800 hover:bg-amber-300 text-stone-400 hover:text-stone-900 transition-all"
                  sx={{ width: 40, height: 40 }}
                >
                  <Linkedin size={20} />
                </IconButton>
              </div>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" className="text-white font-bold mb-4 uppercase tracking-wider">Produto</Typography>
              <ul className="space-y-3 text-sm">
                <li><Link href="/funcionalidades" className="hover:text-amber-300 cursor-pointer transition-colors no-underline text-stone-400">Funcionalidades</Link></li>
                <li><Link href="/planos" className="hover:text-amber-300 cursor-pointer transition-colors no-underline text-stone-400">Planos e Preços</Link></li>
                <li><a href="#" className="hover:text-amber-300 cursor-pointer transition-colors">Integrações</a></li>
                <li><a href="#" className="hover:text-amber-300 cursor-pointer transition-colors">Atualizações</a></li>
              </ul>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" className="text-white font-bold mb-4 uppercase tracking-wider">Empresa</Typography>
              <ul className="space-y-3 text-sm">
                <li><Link href="/sobre" className="hover:text-amber-300 cursor-pointer transition-colors no-underline text-stone-400">Sobre Nós</Link></li>
                <li><a href="#" className="hover:text-amber-300 cursor-pointer transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-amber-300 cursor-pointer transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-amber-300 cursor-pointer transition-colors">Blog</a></li>
              </ul>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" className="text-white font-bold mb-4 uppercase tracking-wider">Contato</Typography>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-amber-300 rounded-full"></div>
                  contato@sigofood.com.br
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-amber-300 rounded-full"></div>
                  (11) 98765-4321
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-amber-300 rounded-full"></div>
                  Av. Paulista, 1000 - São Paulo, SP
                </li>
              </ul>
            </Grid>
          </Grid>

          <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 SIGO FOOD Tecnologia LTDA. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white cursor-pointer transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white cursor-pointer transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white cursor-pointer transition-colors">Cookies</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Home;