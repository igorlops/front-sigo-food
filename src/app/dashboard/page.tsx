'use client';

import { Box, Card, CardContent, Grid, Typography, Button, Paper, Stack, Avatar } from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
  AddBox,
  Category,
  ListAlt,
  ArrowForward,
  CheckCircle
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

// Cores do tema SIGO FOOD
const colors = {
  primaryBlue: '#1e3a8a', // blue-900
  secondaryStone: '#44403c', // stone-700
  accentYellow: '#fcd34d', // amber-300
  bgLight: '#fafaf9', // stone-50
  bgDark: '#0c1e3f', // blue-950
};

export default function DashboardPage() {
  const router = useRouter();

  const stats = [
    {
      title: 'Vendas Hoje',
      value: 'R$ 2.847,90',
      change: '+12.5%',
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#10b981', // green
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
      title: 'Pedidos',
      value: '47',
      change: '+8.2%',
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      color: colors.primaryBlue,
      bgColor: 'rgba(30, 58, 138, 0.1)',
    },
    {
      title: 'Clientes Ativos',
      value: '128',
      change: '+23.1%',
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#f59e0b', // amber
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      title: 'Taxa de Conversão',
      value: '68%',
      change: '+5.4%',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#8b5cf6', // purple
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
  ];

  const quickActions = [
    {
      title: 'Novo Produto',
      description: 'Adicione um produto ao cardápio',
      icon: <AddBox />,
      path: '/dashboard/produtos',
      color: colors.primaryBlue,
    },
    {
      title: 'Nova Categoria',
      description: 'Organize seu cardápio',
      icon: <Category />,
      path: '/dashboard/categorias',
      color: '#f59e0b',
    },
    {
      title: 'Ver Pedidos',
      description: 'Gerencie pedidos ativos',
      icon: <ListAlt />,
      path: '/dashboard/pedidos',
      color: '#10b981',
    },
  ];

  const recentOrders = [
    { id: '#1234', customer: 'João Silva', total: 'R$ 45,90', status: 'Concluído', time: 'há 5 min' },
    { id: '#1235', customer: 'Maria Santos', total: 'R$ 78,50', status: 'Em preparo', time: 'há 12 min' },
    { id: '#1236', customer: 'Pedro Costa', total: 'R$ 32,00', status: 'Concluído', time: 'há 18 min' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: colors.primaryBlue,
            mb: 1,
            background: `linear-gradient(135deg, ${colors.primaryBlue} 0%, ${colors.bgDark} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Bem-vindo ao Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: colors.secondaryStone }}>
          Aqui está um resumo do desempenho do seu restaurante hoje
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                  borderColor: stat.color,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        bgcolor: stat.bgColor,
                        color: stat.color,
                        p: 1.5,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#10b981',
                        fontWeight: 600,
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {stat.change}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: colors.primaryBlue, mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.secondaryStone }}>
                      {stat.title}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.08)',
              height: '100%',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors.primaryBlue, mb: 3 }}>
              Ações Rápidas
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 2,
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                        borderColor: action.color,
                      },
                    }}
                    onClick={() => router.push(action.path)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Box
                        sx={{
                          bgcolor: `${action.color}15`,
                          color: action.color,
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        {action.icon}
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {action.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondaryStone }}>
                        {action.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.08)',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors.primaryBlue }}>
                Pedidos Recentes
              </Typography>
              <Button
                size="small"
                endIcon={<ArrowForward />}
                sx={{ color: colors.primaryBlue }}
                onClick={() => router.push('/dashboard/pedidos')}
              >
                Ver todos
              </Button>
            </Box>
            <Stack spacing={2}>
              {recentOrders.map((order, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: colors.bgLight,
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'white',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {order.id}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.secondaryStone }}>
                      {order.time}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {order.customer}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.primaryBlue }}>
                      {order.total}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        bgcolor: order.status === 'Concluído' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: order.status === 'Concluído' ? '#10b981' : '#f59e0b',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {order.status === 'Concluído' && <CheckCircle sx={{ fontSize: 14 }} />}
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {order.status}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
