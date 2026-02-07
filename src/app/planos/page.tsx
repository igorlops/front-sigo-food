'use client';
import React, { useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Chip,
    Box,
    Switch,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import {
    Smartphone,
    Check,
    X,
    Zap,
    Crown,
    Rocket,
    ArrowRight,
    CheckCircle,
    Sparkles,
    ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/app/ui/components/Navbar';

const colors = {
    primaryBlue: '#1e3a8a',
    accentYellow: '#fcd34d',
};

export default function PlanosPage() {
    const [isAnnual, setIsAnnual] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<string | false>(false);

    const handleFaqChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedFaq(isExpanded ? panel : false);
    };

    const plans = [
        {
            name: 'Starter',
            icon: <Zap className="w-8 h-8" />,
            color: 'from-green-400 to-green-500',
            description: 'Perfeito para iniciar',
            monthlyPrice: 0,
            annualPrice: 0,
            highlight: false,
            features: [
                { included: true, text: 'Até 50 produtos no cardápio' },
                { included: true, text: 'Cardápio digital via QR Code' },
                { included: true, text: 'Até 10 mesas' },
                { included: true, text: 'Controle básico de pedidos' },
                { included: true, text: 'Painel de estatísticas simples' },
                { included: false, text: 'Gestão de clientes' },
                { included: false, text: 'Programa de fidelidade' },
                { included: false, text: 'Relatórios avançados' },
                { included: false, text: 'Múltiplos usuários' },
                { included: false, text: 'Suporte prioritário' }
            ]
        },
        {
            name: 'Professional',
            icon: <Crown className="w-8 h-8" />,
            color: 'from-blue-500 to-blue-600',
            description: 'Para restaurantes em crescimento',
            monthlyPrice: 79.90,
            annualPrice: 67.92,
            highlight: true,
            badge: 'MAIS POPULAR',
            features: [
                { included: true, text: 'Até 200 produtos no cardápio' },
                { included: true, text: 'Cardápio digital via QR Code' },
                { included: true, text: 'Até 30 mesas' },
                { included: true, text: 'Controle completo de pedidos' },
                { included: true, text: 'Dashboard analytics completo' },
                { included: true, text: 'Gestão de clientes' },
                { included: true, text: 'Programa de fidelidade básico' },
                { included: true, text: 'Relatórios detalhados' },
                { included: true, text: 'Até 3 usuários' },
                { included: false, text: 'Suporte prioritário 24/7' }
            ]
        },
        {
            name: 'Enterprise',
            icon: <Rocket className="w-8 h-8" />,
            color: 'from-purple-500 to-purple-600',
            description: 'Solução completa e ilimitada',
            monthlyPrice: 149.90,
            annualPrice: 127.42,
            highlight: false,
            badge: 'COMPLETO',
            features: [
                { included: true, text: 'Produtos ilimitados' },
                { included: true, text: 'Cardápio digital personalizado' },
                { included: true, text: 'Mesas ilimitadas' },
                { included: true, text: 'Controle avançado de pedidos' },
                { included: true, text: 'Analytics em tempo real' },
                { included: true, text: 'CRM completo de clientes' },
                { included: true, text: 'Programa de fidelidade avançado' },
                { included: true, text: 'Relatórios personalizados' },
                { included: true, text: 'Usuários ilimitados' },
                { included: true, text: 'Suporte prioritário 24/7' }
            ]
        }
    ];

    const faqs = [
        {
            id: 'faq1',
            question: 'Posso mudar de plano a qualquer momento?',
            answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor imediatamente e você paga apenas a diferença proporcional.'
        },
        {
            id: 'faq2',
            question: 'Como funciona o período de teste?',
            answer: 'Oferecemos 14 dias de teste grátis em qualquer plano. Não é necessário cartão de crédito para começar. Durante o período de teste, você tem acesso a todos os recursos do plano escolhido.'
        },
        {
            id: 'faq3',
            question: 'Há taxas sobre as vendas?',
            answer: 'Não! Cobramos apenas a mensalidade do plano escolhido. Diferente de outros sistemas como iFood e Rappi, não cobramos porcentagem sobre suas vendas. Todo o lucro é seu!'
        },
        {
            id: 'faq4',
            question: 'Posso cancelar a qualquer momento?',
            answer: 'Sim, você pode cancelar quando quiser. Não há multas, taxas de cancelamento ou períodos mínimos de contrato. Sua assinatura permanece ativa até o final do período pago.'
        },
        {
            id: 'faq5',
            question: 'Vocês oferecem treinamento?',
            answer: 'Sim! Oferecemos treinamento completo via vídeo, documentação detalhada e suporte durante todo o processo de implementação. Nossa equipe está disponível para ajudar você a configurar tudo.'
        },
        {
            id: 'faq6',
            question: 'Como funciona o desconto anual?',
            answer: 'Ao optar pelo pagamento anual, você recebe 15% de desconto em todos os planos pagos. O valor é cobrado uma vez por ano e você economiza o equivalente a quase 2 meses de assinatura.'
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
                            label="ESCOLHA SEU PLANO"
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
                            Planos que <span className="text-amber-300">crescem</span> com você
                        </Typography>

                        <Typography variant="h6" className="text-blue-100 leading-relaxed max-w-3xl mx-auto mb-10">
                            Sem taxas sobre vendas. Sem surpresas. Apenas preços justos para que você possa focar no que importa: seu negócio.
                        </Typography>

                        {/* Toggle Mensal/Anual */}
                        <Box
                            className="flex items-center justify-center gap-3 bg-blue-900/50 backdrop-blur-xl border border-blue-800 rounded-full p-2 inline-flex"
                            data-aos="zoom-in"
                            data-aos-delay="200"
                        >
                            <Typography className={`px-4 py-1 rounded-full transition-all duration-300 ${!isAnnual ? 'bg-amber-300 text-blue-900 font-bold' : 'text-blue-200'}`}>
                                Mensal
                            </Typography>
                            <Switch
                                checked={isAnnual}
                                onChange={() => setIsAnnual(!isAnnual)}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: colors.accentYellow,
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: colors.accentYellow,
                                    },
                                }}
                            />
                            <Typography className={`px-4 py-1 rounded-full transition-all duration-300 ${isAnnual ? 'bg-amber-300 text-blue-900 font-bold' : 'text-blue-200'}`}>
                                Anual
                                <Chip
                                    label="15% OFF"
                                    size="small"
                                    sx={{
                                        ml: 1,
                                        bgcolor: 'rgba(34, 197, 94, 0.2)',
                                        color: '#22c55e',
                                        fontWeight: 700,
                                        fontSize: '0.7rem'
                                    }}
                                />
                            </Typography>
                        </Box>
                    </div>
                </Container>
            </section>

            {/* Plans Grid */}
            <section className="py-24 bg-gradient-to-b from-stone-50 to-white">
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="stretch">
                        {plans.map((plan, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <div className="relative h-full" data-aos="fade-up" data-aos-delay={index * 100}>
                                    {/* Badge - Positioned outside the card */}
                                    {plan.badge && (
                                        <div
                                            className={`absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r ${plan.color} text-white text-xs font-bold shadow-lg z-10 whitespace-nowrap`}
                                            data-aos="zoom-in"
                                            data-aos-delay={index * 100 + 200}
                                        >
                                            {plan.badge}
                                        </div>
                                    )}

                                    <Card
                                        className={`h-full card-hover shadow-smooth rounded-3xl ${plan.highlight
                                                ? 'border-2 border-amber-300'
                                                : 'border border-stone-200'
                                            }`}
                                        elevation={0}
                                        sx={{
                                            background: plan.highlight
                                                ? 'linear-gradient(to bottom, #fffbeb, white)'
                                                : 'white',
                                            mt: plan.badge ? 3 : 0,
                                            '&:hover': {
                                                boxShadow: plan.highlight
                                                    ? '0 20px 60px rgba(252, 211, 77, 0.3)'
                                                    : '0 20px 60px rgba(0, 0, 0, 0.1)'
                                            }
                                        }}
                                    >
                                        <CardContent className="p-8">
                                            {/* Icon */}
                                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} text-white mb-4 shadow-lg icon-hover`}>
                                                {plan.icon}
                                            </div>

                                            {/* Plan Name */}
                                            <Typography variant="h4" className="font-bold text-stone-900 mb-2">
                                                {plan.name}
                                            </Typography>
                                            <Typography variant="body2" className="text-stone-600 mb-6">
                                                {plan.description}
                                            </Typography>

                                            {/* Price */}
                                            <div className="mb-6">
                                                <div className="flex items-baseline gap-2">
                                                    <Typography variant="h3" className="font-extrabold text-blue-900">
                                                        R$ {isAnnual ? plan.annualPrice.toFixed(2).replace('.', ',') : plan.monthlyPrice.toFixed(2).replace('.', ',')}
                                                    </Typography>
                                                    <Typography variant="body1" className="text-stone-500">
                                                        /mês
                                                    </Typography>
                                                </div>
                                                {isAnnual && plan.monthlyPrice > 0 && (
                                                    <Typography variant="caption" className="text-green-600 font-semibold block mt-1">
                                                        💰 Economize R$ {((plan.monthlyPrice - plan.annualPrice) * 12).toFixed(2).replace('.', ',')} por ano
                                                    </Typography>
                                                )}
                                            </div>

                                            {/* CTA Button */}
                                            <Link href="/login" passHref style={{ textDecoration: 'none' }}>
                                                <Button
                                                    variant={plan.highlight ? 'contained' : 'outlined'}
                                                    fullWidth
                                                    size="large"
                                                    endIcon={<ArrowRight size={18} />}
                                                    className="smooth-transition"
                                                    sx={{
                                                        bgcolor: plan.highlight ? colors.accentYellow : 'transparent',
                                                        color: plan.highlight ? colors.primaryBlue : colors.primaryBlue,
                                                        borderColor: plan.highlight ? 'transparent' : colors.primaryBlue,
                                                        fontWeight: 'bold',
                                                        py: 1.5,
                                                        mb: 4,
                                                        borderRadius: '12px',
                                                        textTransform: 'none',
                                                        fontSize: '1rem',
                                                        '&:hover': {
                                                            bgcolor: plan.highlight ? '#fbbf24' : 'rgba(30, 58, 138, 0.05)',
                                                            borderColor: colors.primaryBlue,
                                                            transform: 'translateY(-2px)'
                                                        }
                                                    }}
                                                >
                                                    {plan.monthlyPrice === 0 ? 'Começar Grátis' : 'Assinar Agora'}
                                                </Button>
                                            </Link>

                                            {/* Features List */}
                                            <div className="space-y-3">
                                                {plan.features.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-start gap-3">
                                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${feature.included
                                                                ? 'bg-green-100 text-green-600'
                                                                : 'bg-stone-100 text-stone-400'
                                                            }`}>
                                                            {feature.included ? <Check size={14} /> : <X size={14} />}
                                                        </div>
                                                        <Typography
                                                            variant="body2"
                                                            className={`leading-relaxed ${feature.included ? 'text-stone-700' : 'text-stone-400'}`}
                                                        >
                                                            {feature.text}
                                                        </Typography>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Additional Info */}
                    <div className="text-center mt-12 max-w-3xl mx-auto" data-aos="fade-up">
                        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-green-500" size={20} />
                                <Typography variant="body2" className="text-stone-700 font-medium">
                                    Teste grátis de 14 dias
                                </Typography>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-green-500" size={20} />
                                <Typography variant="body2" className="text-stone-700 font-medium">
                                    Sem cartão de crédito
                                </Typography>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-green-500" size={20} />
                                <Typography variant="body2" className="text-stone-700 font-medium">
                                    Cancele quando quiser
                                </Typography>
                            </div>
                        </div>
                        <Typography variant="body2" className="text-stone-500">
                            Todos os planos incluem atualizações automáticas, backups diários e suporte técnico via chat.
                        </Typography>
                    </div>
                </Container>
            </section>

            {/* FAQ Section with Accordions */}
            <section className="py-24 bg-white">
                <Container maxWidth="md">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <Typography variant="h2" className="font-bold text-stone-900 mb-3" sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}>
                            Perguntas Frequentes
                        </Typography>
                        <Typography variant="body1" className="text-stone-600">
                            Tire suas dúvidas sobre nossos planos e serviços
                        </Typography>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <Accordion
                                key={faq.id}
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                                expanded={expandedFaq === faq.id}
                                onChange={handleFaqChange(faq.id)}
                                className="shadow-smooth border border-stone-200 rounded-2xl overflow-hidden"
                                sx={{
                                    '&:before': {
                                        display: 'none',
                                    },
                                    '&.Mui-expanded': {
                                        margin: '0 0 12px 0',
                                    },
                                    boxShadow: expandedFaq === faq.id ? '0 8px 30px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ChevronDown className={`transition-transform duration-300 ${expandedFaq === faq.id ? 'rotate-180' : ''}`} />}
                                    sx={{
                                        padding: '16px 24px',
                                        '&:hover': {
                                            bgcolor: 'rgba(30, 58, 138, 0.02)'
                                        }
                                    }}
                                >
                                    <Typography variant="h6" className="font-bold text-stone-900">
                                        {faq.question}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '0 24px 24px 24px' }}>
                                    <Typography variant="body1" className="text-stone-600 leading-relaxed">
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>

                    <div className="text-center mt-12" data-aos="fade-up">
                        <Typography variant="body1" className="text-stone-600 mb-4">
                            Ainda tem dúvidas?
                        </Typography>
                        <Button
                            variant="outlined"
                            className="smooth-transition"
                            sx={{
                                borderColor: colors.primaryBlue,
                                color: colors.primaryBlue,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 4,
                                py: 1.5,
                                borderRadius: '12px',
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    borderColor: colors.primaryBlue,
                                    bgcolor: 'rgba(30, 58, 138, 0.05)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            Falar com Especialista
                        </Button>
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
