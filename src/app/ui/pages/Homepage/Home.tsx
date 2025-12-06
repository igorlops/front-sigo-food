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
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  TextField,
  IconButton,
  Stack
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
  Linkedin
} from 'lucide-react';

// --- Configuração de Cores e Tema ---
// O 'stone-700' é um cinza quente escuro. O 'amber-300' é o amarelo.
// Adicionei um 'brandBlue' personalizado para combinar exatamente com o azul da logo.
const colors = {
  primaryBlue: '#1e3a8a', // Um azul próximo ao da logo (blue-900 do tailwind)
  secondaryStone: '#44403c', // stone-700
  accentYellow: '#fcd34d', // amber-300
  bgLight: '#fcfcfc',
};

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 text-stone-800 overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: colors.primaryBlue }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters className="flex justify-between py-2">
            {/* Logo Area */}
            <div className="flex items-center gap-2">
              <div className="bg-amber-300 p-1 rounded-lg">
                <Smartphone className="text-blue-900 w-6 h-6" />
              </div>
              <Typography variant="h6" component="div" className="font-bold tracking-tight text-white">
                SIGO <span className="text-amber-300">FOOD</span>
              </Typography>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">
              <Button color="inherit" className="text-gray-200 hover:text-amber-300 normal-case">Funcionalidades</Button>
              <Button color="inherit" className="text-gray-200 hover:text-amber-300 normal-case">Planos</Button>
              <Button color="inherit" className="text-gray-200 hover:text-amber-300 normal-case">Sobre</Button>
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: colors.accentYellow, 
                  color: colors.primaryBlue,
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#f59e0b' } 
                }}
                href='/login'
              >
                Entrar no Sistema
              </Button>
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
          <div className="md:hidden bg-blue-900 border-t border-blue-800 px-4 py-4 flex flex-col gap-4 animate-fade-in">
             <Button fullWidth color="inherit" className="justify-start text-white">Funcionalidades</Button>
             <Button fullWidth color="inherit" className="justify-start text-white">Planos</Button>
             <Button fullWidth variant="contained" sx={{ bgcolor: colors.accentYellow, color: colors.primaryBlue }}>
                Entrar / Cadastrar
             </Button>
          </div>
        )}
      </AppBar>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-blue-950 pt-16 pb-20 lg:pt-32 lg:pb-28">
        {/* Background decorative circle matching logo vibe */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-amber-300 rounded-full opacity-10 blur-3xl pointer-events-none"></div>

        <Container maxWidth="lg" className="relative z-10">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <div className="space-y-6 text-center md:text-left">
                <div className="inline-block px-4 py-1.5 rounded-full bg-blue-900 border border-blue-700 text-amber-300 text-sm font-medium mb-2">
                  🚀 O sistema favorito dos restaurantes modernos
                </div>
                <Typography variant="h2" component="h1" className="text-white font-extrabold leading-tight text-4xl md:text-6xl">
                  Seu Cardápio Digital <br/>
                  <span className="text-amber-300">Inteligente e Lucrativo</span>
                </Typography>
                <Typography variant="h6" className="text-blue-200 font-light leading-relaxed">
                  Diga adeus aos cardápios de papel e às taxas abusivas. Com o <strong>SIGO FOOD</strong>, você cria seu cardápio online em minutos, automatiza pedidos via QR Code e fideliza seus clientes.
                </Typography>
                
                <Stack direction='row' spacing={2} className="pt-4 justify-center md:justify-start">
                  <Button 
                    variant="contained" 
                    size="large"
                    endIcon={<ArrowRight size={20} />}
                    sx={{ 
                      bgcolor: colors.accentYellow, 
                      color: colors.primaryBlue,
                      fontWeight: '800',
                      fontSize: '1.1rem',
                      padding: '12px 32px',
                      borderRadius: '8px',
                      '&:hover': { bgcolor: '#fbbf24' } 
                    }}
                  >
                    Criar Cardápio Grátis
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      color: 'white', 
                      borderColor: 'rgba(255,255,255,0.3)',
                      padding: '12px 32px',
                      borderRadius: '8px',
                      '&:hover': { borderColor: colors.accentYellow, color: colors.accentYellow } 
                    }}
                  >
                    Ver Demonstração
                  </Button>
                </Stack>
                <div className="pt-4 flex items-center justify-center md:justify-start gap-4 text-sm text-blue-300">
                  <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-amber-300"/> Sem cartão de crédito</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-amber-300"/> Setup em 5 min</span>
                </div>
              </div>
            </Grid>
            
            {/* Hero Image / Mockup */}
            <Grid item xs={12} md={6}>
              <div className="relative mx-auto max-w-[350px] md:max-w-none">
                {/* Abstract Phone Shape */}
                <div className="relative z-10 bg-stone-900 border-8 border-stone-800 rounded-[3rem] overflow-hidden shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                  <div className="bg-stone-800 h-8 w-40 mx-auto rounded-b-2xl absolute top-0 left-1/2 -translate-x-1/2 z-20"></div>
                  {/* Screen Content Mockup */}
                  <div className="h-[600px] bg-white w-full overflow-hidden flex flex-col">
                    {/* App Header */}
                    <div className="bg-amber-300 h-40 p-6 pt-12 flex flex-col justify-end">
                       <h3 className="font-bold text-blue-900 text-2xl">Burguer Kingão</h3>
                       <p className="text-blue-800 text-sm">Aberto • ⭐ 4.8</p>
                    </div>
                    {/* App Body */}
                    <div className="p-4 space-y-4 overflow-y-auto">
                       <div className="font-bold text-stone-700 mb-2">Mais pedidos</div>
                       {[1, 2, 3].map((i) => (
                         <div key={i} className="flex gap-3 p-3 rounded-xl border border-stone-100 shadow-sm items-center">
                           <div className="w-16 h-16 bg-stone-200 rounded-lg flex-shrink-0"></div>
                           <div className="flex-1">
                             <div className="font-bold text-stone-800 text-sm">X-Bacon Supremo</div>
                             <div className="text-xs text-stone-500">Dupla carne, bacon crocante...</div>
                             <div className="flex justify-between items-center mt-1">
                                <span className="text-blue-900 font-bold">R$ 28,90</span>
                                <div className="w-6 h-6 bg-amber-300 rounded-full flex items-center justify-center text-blue-900 text-xs font-bold">+</div>
                             </div>
                           </div>
                         </div>
                       ))}
                    </div>
                    {/* Floating Cart Button */}
                    <div className="absolute bottom-6 left-6 right-6 bg-blue-900 text-white p-4 rounded-xl flex justify-between items-center shadow-lg cursor-pointer">
                        <span className="bg-blue-800 px-2 py-1 rounded text-xs font-bold">3</span>
                        <span className="font-bold">Ver Sacola</span>
                        <span className="font-bold">R$ 86,70</span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements behind phone */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 bg-white">
        <Container maxWidth="lg">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Typography variant="overline" className="text-amber-600 font-bold tracking-wider">
              POR QUE ESCOLHER O SIGO FOOD?
            </Typography>
            <Typography variant="h3" className="mt-2 font-bold text-stone-800">
              Tudo o que você precisa para <span className="text-blue-900">vender mais</span>
            </Typography>
            <Typography variant="body1" className="mt-4 text-stone-600">
              Desenvolvemos ferramentas pensadas para a agilidade da sua cozinha e a comodidade do seu cliente.
            </Typography>
          </div>

          <Grid container spacing={4}>
            {[
              {
                icon: <QrCode className="w-10 h-10 text-amber-500" />,
                title: "Cardápio via QR Code",
                desc: "Seu cliente senta, escaneia e pede. Sem esperar pelo garçom, reduzindo erros e aumentando o giro de mesas."
              },
              {
                icon: <Smartphone className="w-10 h-10 text-amber-500" />,
                title: "Design Responsivo",
                desc: "Seu cardápio abre perfeitamente em qualquer celular, tablet ou computador. Uma vitrine linda para seus pratos."
              },
              {
                icon: <ChefHat className="w-10 h-10 text-amber-500" />,
                title: "Gestão de Produtos",
                desc: "Acabou um ingrediente? Pause o produto no sistema em 1 clique e evite frustração do cliente."
              },
              {
                icon: <TrendingUp className="w-10 h-10 text-amber-500" />,
                title: "Painel de Vendas",
                desc: "Acompanhe quais são seus pratos mais vendidos, horários de pico e faturamento em tempo real."
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={0} className="h-full bg-stone-50 border border-stone-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-2xl">
                  <CardContent className="text-center p-6 flex flex-col items-center h-full">
                    <div className="mb-4 p-4 bg-blue-50 rounded-full">
                      {feature.icon}
                    </div>
                    <Typography variant="h6" className="font-bold text-stone-800 mb-2">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="text-stone-600">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* --- SOCIAL PROOF / STATS --- */}
      <section className="py-16 bg-stone-900 text-white">
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center" className="text-center divide-y md:divide-y-0 md:divide-x divide-stone-700">
            <Grid item xs={12} md={4}>
              <Typography variant="h3" className="font-bold text-amber-300">+500</Typography>
              <Typography variant="subtitle1" className="text-stone-300 uppercase tracking-widest text-sm mt-2">Restaurantes Cadastrados</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" className="font-bold text-amber-300">+50k</Typography>
              <Typography variant="subtitle1" className="text-stone-300 uppercase tracking-widest text-sm mt-2">Pedidos Mensais</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h3" className="font-bold text-amber-300">R$ 0,00</Typography>
              <Typography variant="subtitle1" className="text-stone-300 uppercase tracking-widest text-sm mt-2">De taxa sobre vendas</Typography>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-20 bg-stone-50">
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <div className="space-y-8">
                <div>
                  <Typography variant="h4" className="font-bold text-blue-900 mb-4">
                    Começar é muito simples
                  </Typography>
                  <Typography className="text-stone-600">
                    Você não precisa de conhecimentos técnicos. O SIGO FOOD foi feito para donos de restaurantes, não para programadores.
                  </Typography>
                </div>

                {[
                  { step: "01", title: "Cadastre seu Negócio", text: "Crie sua conta em segundos informando os dados básicos do restaurante." },
                  { step: "02", title: "Adicione seus Produtos", text: "Insira fotos, descrições sedutoras e preços. Organize por categorias." },
                  { step: "03", title: "Divulgue e Venda", text: "Gere seu QR Code ou envie o link pelo WhatsApp para seus clientes." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-900 font-bold text-xl rounded-xl flex items-center justify-center border border-blue-200">
                      {item.step}
                    </div>
                    <div>
                      <Typography variant="h6" className="font-bold text-stone-800">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" className="text-stone-600 mt-1">
                        {item.text}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12} md={7}>
              {/* Image placeholder for admin dashboard */}
              <div className="bg-white p-2 rounded-xl shadow-2xl border border-stone-200 transform md:rotate-2 hover:rotate-0 transition-all duration-500">
                 <div className="bg-stone-100 rounded-lg aspect-video w-full flex items-center justify-center flex-col gap-3 border border-dashed border-stone-300 text-stone-400">
                    <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg p-6 relative overflow-hidden">
                        {/* Abstract UI representation of Dashboard */}
                        <div className="flex gap-4 mb-6">
                            <div className="w-1/4 h-24 bg-white rounded shadow-sm"></div>
                            <div className="w-1/4 h-24 bg-white rounded shadow-sm"></div>
                            <div className="w-1/4 h-24 bg-white rounded shadow-sm"></div>
                            <div className="w-1/4 h-24 bg-white rounded shadow-sm border-l-4 border-amber-300"></div>
                        </div>
                        <div className="w-full h-64 bg-white rounded shadow-sm p-4">
                            <div className="w-full h-4 bg-stone-100 rounded mb-4"></div>
                            <div className="w-2/3 h-4 bg-stone-100 rounded mb-8"></div>
                            <div className="flex gap-2 items-end h-32">
                                <div className="w-full bg-blue-100 h-1/2 rounded-t"></div>
                                <div className="w-full bg-blue-200 h-3/4 rounded-t"></div>
                                <div className="w-full bg-blue-900 h-full rounded-t relative group">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">Vendas!</div>
                                </div>
                                <div className="w-full bg-blue-200 h-2/3 rounded-t"></div>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-20 bg-amber-300 relative overflow-hidden">
        <Container maxWidth="md" className="text-center relative z-10">
          <Typography variant="h3" className="font-extrabold text-blue-900 mb-6">
            Pronto para revolucionar seu atendimento?
          </Typography>
          <Typography variant="h6" className="text-blue-800/80 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de negócios de alimentação que já usam o SIGO FOOD para vender mais e melhor.
          </Typography>
          
          <div className="bg-white p-2 rounded-full shadow-xl max-w-md mx-auto flex">
            <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex-1 bg-transparent border-none outline-none px-6 text-stone-700 placeholder-stone-400"
            />
            <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: colors.primaryBlue, 
                  color: 'white',
                  borderRadius: '99px',
                  padding: '10px 24px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#172554' } 
                }}
            >
                Começar Agora
            </Button>
          </div>
          <Typography variant="caption" className="block mt-4 text-blue-900/60">
            Teste grátis por 14 dias. Não pedimos cartão agora.
          </Typography>
        </Container>
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 opacity-10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-amber-300 p-1 rounded">
                   <Smartphone className="text-stone-900 w-5 h-5" />
                </div>
                <Typography variant="h6" className="font-bold text-white">
                  SIGO <span className="text-amber-300">FOOD</span>
                </Typography>
              </div>
              <Typography variant="body2" className="mb-4">
                Facilitando a vida de quem empreende com comida. A plataforma completa para digitalizar seu negócio.
              </Typography>
              <div className="flex gap-4">
                <IconButton size="small" className="text-stone-400 hover:text-amber-300"><Instagram size={20}/></IconButton>
                <IconButton size="small" className="text-stone-400 hover:text-amber-300"><Facebook size={20}/></IconButton>
                <IconButton size="small" className="text-stone-400 hover:text-amber-300"><Linkedin size={20}/></IconButton>
              </div>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" className="text-white font-bold mb-4 uppercase tracking-wider">Produto</Typography>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-amber-300 cursor-pointer">Funcionalidades</li>
                <li className="hover:text-amber-300 cursor-pointer">Preços</li>
                <li className="hover:text-amber-300 cursor-pointer">Integrações</li>
                <li className="hover:text-amber-300 cursor-pointer">Atualizações</li>
              </ul>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" className="text-white font-bold mb-4 uppercase tracking-wider">Empresa</Typography>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-amber-300 cursor-pointer">Sobre nós</li>
                <li className="hover:text-amber-300 cursor-pointer">Carreiras</li>
                <li className="hover:text-amber-300 cursor-pointer">Contato</li>
                <li className="hover:text-amber-300 cursor-pointer">Blog</li>
              </ul>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" className="text-white font-bold mb-4 uppercase tracking-wider">Contato</Typography>
              <ul className="space-y-2 text-sm">
                <li>contato@sigofood.com.br</li>
                <li>0800 123 4567</li>
                <li>Av. Gastronomia, 1000 - São Paulo, SP</li>
              </ul>
            </Grid>
          </Grid>
          
          <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 SIGO FOOD Tecnologia LTDA. Todos os direitos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="hover:text-white cursor-pointer">Termos de Uso</span>
              <span className="hover:text-white cursor-pointer">Privacidade</span>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Home;