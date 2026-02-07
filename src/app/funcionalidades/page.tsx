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
    Box
} from '@mui/material';
import {
    QrCode,
    Smartphone,
    TrendingUp,
    ChefHat,
    Utensils,
    ShoppingBag,
    BarChart3,
    Clock,
    CreditCard,
    Users,
    Wifi,
    Bell,
    Package,
    Printer,
    MessageSquare,
    Star,
    Settings,
    Shield,
    Zap,
    ArrowRight,
    Sparkles,
    CheckCircle,
    Target
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/app/ui/components/Navbar';

const colors = {
    primaryBlue: '#1e3a8a',
    accentYellow: '#fcd34d',
};

export default function FuncionalidadesPage() {
    const mainFeatures = [
        {
            icon: <QrCode className="w-16 h-16" />,
            title: "Cardápio Digital Inteligente",
            description: "Cliente escaneia o QR Code e acessa um cardápio completo e interativo. Fotos em alta qualidade, descrições detalhadas e atualização instantânea.",
            gradient: "from-amber-400 via-orange-400 to-red-400",
            benefits: [
                "QR Code único por mesa",
                "Atualização em tempo real",
                "Fotos em alta qualidade",
                "Categorias personalizadas"
            ]
        },
        {
            icon: <Utensils className="w-16 h-16" />,
            title: "Gestão Total de Mesas",
            description: "Controle completo de todas as mesas do restaurante. Veja ocupação em tempo real, histórico de comandas e otimize o atendimento.",
            gradient: "from-blue-400 via-indigo-400 to-purple-400",
            benefits: [
                "Status em tempo real",
                "Histórico completo",
                "Fechamento rápido",
                "Divisão de contas"
            ]
        },
        {
            icon: <BarChart3 className="w-16 h-16" />,
            title: "Analytics Avançado",
            description: "Dashboard completo com métricas essenciais. Identifique produtos mais vendidos, horários de pico e tome decisões baseadas em dados.",
            gradient: "from-green-400 via-emerald-400 to-teal-400",
            benefits: [
                "Produtos best-sellers",
                "Análise de horários",
                "Ticket médio",
                "Relatórios personalizados"
            ]
        },
        {
            icon: <Bell className="w-16 h-16" />,
            title: "Pedidos em Tempo Real",
            description: "Receba notificações instantâneas de cada pedido. Integre com impressoras térmicas e mantenha a cozinha sempre organizada.",
            gradient: "from-pink-400 via-rose-400 to-red-400",
            benefits: [
                "Notificações sonoras",
                "Impressão automática",
                "Status de preparo",
                "Tempo de entrega"
            ]
        }
    ];

    const allFeatures = [
        {
            category: "Experiência do Cliente",
            icon: <Sparkles className="w-6 h-6" />,
            color: "from-purple-500 to-pink-500",
            features: [
                { icon: <Smartphone />, name: "Navegação intuitiva mobile-first", description: "Interface otimizada para celular" },
                { icon: <Star />, name: "Fotos profissionais dos pratos", description: "Galeria de imagens de alta qualidade" },
                { icon: <MessageSquare />, name: "Observações personalizadas", description: "Cliente pode adicionar comentários" },
                { icon: <Target />, name: "Recomendações inteligentes", description: "Sugestões baseadas em preferências" }
            ]
        },
        {
            category: "Gestão Operacional",
            icon: <Settings className="w-6 h-6" />,
            color: "from-blue-500 to-cyan-500",
            features: [
                { icon: <Package />, name: "Controle de estoque", description: "Monitore ingredientes e produtos" },
                { icon: <Clock />, name: "Horários de funcionamento", description: "Configure dias e horários" },
                { icon: <Users />, name: "Múltiplos usuários", description: "Garçons, cozinha, gerente" },
                { icon: <Printer />, name: "Impressão automática", description: "Integração com impressoras" }
            ]
        },
        {
            category: "Vendas e Pagamentos",
            icon: <CreditCard className="w-6 h-6" />,
            color: "from-green-500 to-emerald-500",
            features: [
                { icon: <CreditCard />, name: "Múltiplas formas de pagamento", description: "PIX, cartão, dinheiro" },
                { icon: <TrendingUp />, name: "Upsell automático", description: "Sugestões de adicionais" },
                { icon: <ShoppingBag />, name: "Combos e promoções", description: "Crie ofertas especiais" },
                { icon: <BarChart3 />, name: "Controle financeiro", description: "Acompanhe recebimentos" }
            ]
        },
        {
            category: "Tecnologia e Segurança",
            icon: <Shield className="w-6 h-6" />,
            color: "from-indigo-500 to-purple-500",
            features: [
                { icon: <Wifi />, name: "100% em nuvem", description: "Acesse de qualquer lugar" },
                { icon: <Shield />, name: "Dados criptografados", description: "Máxima segurança" },
                { icon: <Zap />, name: "Alta performance", description: "Resposta em milissegundos" },
                { icon: <Bell />, name: "Backup automático", description: "Nunca perca informações" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 py-20 lg:py-28">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-300 rounded-full opacity-10 blur-[120px] animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full opacity-10 blur-[120px] animate-blob animation-delay-2000"></div>

                <Container maxWidth="lg" className="relative z-10">
                    <div className="text-center max-w-4xl mx-auto" data-aos="fade-up">
                        <Chip
                            icon={<Sparkles size={16} className="text-amber-300" />}
                            label="RECURSOS PODEROSOS"
                            sx={{
                                bgcolor: 'rgba(252, 211, 77, 0.15)',
                                color: colors.accentYellow,
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                mb: 3,
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(252, 211, 77, 0.3)'
                            }}
                        />
                        <Typography
                            variant="h1"
                            className="text-white font-extrabold mb-6"
                            sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}
                        >
                            Funcionalidades que fazem a <span className="text-amber-300">diferença</span>
                        </Typography>
                        <Typography variant="h6" className="text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
                            Descubra como o SIGO FOOD pode transformar completamente a operação do seu restaurante
                            com tecnologia de ponta e facilidade de uso.
                        </Typography>

                        <div className="flex flex-wrap items-center justify-center gap-4 text-blue-200">
                            <div className="flex items-center gap-2" data-aos="fade-right" data-aos-delay="100">
                                <CheckCircle className="text-green-400" size={20} />
                                <span>Fácil de usar</span>
                            </div>
                            <div className="flex items-center gap-2" data-aos="fade-right" data-aos-delay="200">
                                <CheckCircle className="text-green-400" size={20} />
                                <span>Setup rápido</span>
                            </div>
                            <div className="flex items-center gap-2" data-aos="fade-right" data-aos-delay="300">
                                <CheckCircle className="text-green-400" size={20} />
                                <span>Suporte completo</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Main Features - Hero Cards */}
            <section className="py-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
                <Container maxWidth="lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {mainFeatures.map((feature, index) => (
                            <Card
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="card-hover shadow-smooth overflow-hidden rounded-3xl border-0 relative group"
                                sx={{
                                    background: 'white',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    '&:hover': {
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
                                    }
                                }}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.gradient}`}></div>

                                <CardContent className="p-8 lg:p-10">
                                    {/* Icon with gradient background */}
                                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${feature.gradient} text-white mb-6 icon-hover shadow-xl`}>
                                        {feature.icon}
                                    </div>

                                    {/* Title */}
                                    <Typography variant="h4" className="font-bold text-stone-900 mb-4">
                                        {feature.title}
                                    </Typography>

                                    {/* Description */}
                                    <Typography variant="body1" className="text-stone-600 leading-relaxed mb-6">
                                        {feature.description}
                                    </Typography>

                                    {/* Benefits List */}
                                    <div className="space-y-3">
                                        {feature.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                                                    <CheckCircle size={14} className="text-white" />
                                                </div>
                                                <Typography variant="body2" className="text-stone-700 font-medium">
                                                    {benefit}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Detailed Features by Category */}
            <section className="py-24 bg-white">
                <Container maxWidth="lg">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <Typography variant="h2" className="font-bold text-stone-900 mb-4" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                            Explore Todos os <span className="text-blue-900">Recursos</span>
                        </Typography>
                        <Typography variant="body1" className="text-stone-600 max-w-2xl mx-auto text-lg">
                            Uma plataforma completa com tudo que você precisa para gerenciar seu restaurante
                        </Typography>
                    </div>

                    <div className="space-y-16">
                        {allFeatures.map((category, categoryIndex) => (
                            <div key={categoryIndex} data-aos="fade-up" data-aos-delay={categoryIndex * 50}>
                                {/* Category Header */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg icon-hover`}>
                                        {category.icon}
                                    </div>
                                    <div>
                                        <Typography variant="h4" className="font-bold text-stone-900">
                                            {category.category}
                                        </Typography>
                                    </div>
                                </div>

                                {/* Features Grid */}
                                <Grid container spacing={3}>
                                    {category.features.map((feature, featureIndex) => (
                                        <Grid item xs={12} sm={6} lg={3} key={featureIndex}>
                                            <Card
                                                data-aos="zoom-in"
                                                data-aos-delay={featureIndex * 50}
                                                className="h-full card-hover shadow-smooth border border-stone-100 rounded-2xl overflow-hidden group"
                                                sx={{
                                                    background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
                                                    '&:hover': {
                                                        borderColor: 'transparent',
                                                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
                                                    }
                                                }}
                                            >
                                                <CardContent className="p-6">
                                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} text-white mb-4 icon-hover shadow-md`}>
                                                        {React.cloneElement(feature.icon, { size: 20 })}
                                                    </div>

                                                    <Typography variant="h6" className="font-bold text-stone-900 mb-2">
                                                        {feature.name}
                                                    </Typography>

                                                    <Typography variant="body2" className="text-stone-600 leading-relaxed">
                                                        {feature.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-purple-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-300 rounded-full opacity-10 blur-[150px] animate-blob"></div>

                <Container maxWidth="md" className="text-center relative z-10">
                    <div data-aos="fade-up">
                        <Sparkles className="w-16 h-16 text-amber-300 mx-auto mb-6 animate-pulse" />

                        <Typography variant="h2" className="text-white font-bold mb-6" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                            Pronto para <span className="text-amber-300">começar</span>?
                        </Typography>

                        <Typography variant="h6" className="text-blue-100 mb-10 leading-relaxed">
                            Teste todas essas funcionalidades gratuitamente por 14 dias.
                            Sem cartão de crédito, sem compromisso.
                        </Typography>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/login" passHref style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowRight />}
                                    className="smooth-transition"
                                    sx={{
                                        bgcolor: colors.accentYellow,
                                        color: colors.primaryBlue,
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        px: 5,
                                        py: 2,
                                        borderRadius: '14px',
                                        textTransform: 'none',
                                        boxShadow: '0 10px 40px rgba(252, 211, 77, 0.4)',
                                        '&:hover': {
                                            bgcolor: '#fbbf24',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 15px 50px rgba(252, 211, 77, 0.5)'
                                        }
                                    }}
                                >
                                    Criar Conta Grátis
                                </Button>
                            </Link>

                            <Link href="/planos" passHref style={{ textDecoration: 'none' }}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    className="smooth-transition"
                                    sx={{
                                        color: 'white',
                                        borderColor: 'rgba(255,255,255,0.3)',
                                        borderWidth: 2,
                                        fontSize: '1.1rem',
                                        px: 5,
                                        py: 2,
                                        borderRadius: '14px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        '&:hover': {
                                            borderColor: colors.accentYellow,
                                            borderWidth: 2,
                                            color: colors.accentYellow,
                                            transform: 'translateY(-3px)'
                                        }
                                    }}
                                >
                                    Ver Planos
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Footer */}
            <footer className="bg-stone-900 text-stone-400 py-8 text-center border-t border-stone-800">
                <Container>
                    <Typography variant="body2">
                        © 2026 SIGO FOOD Tecnologia LTDA. Todos os direitos reservados.
                    </Typography>
                </Container>
            </footer>
        </div>
    );
}
