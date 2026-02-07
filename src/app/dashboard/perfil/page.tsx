'use client';

import { useEffect, useState } from 'react';
import { Typography, Box, Paper, Grid, Avatar, Divider, Button } from '@mui/material';
import { Breadcrumb } from '@/app/ui/components/itens/Breadcrumb';
import { UserLocalStorage, UserLoginInterface } from '@/app/data/utils/const/User';
import UsuarioForm from '@/app/ui/components/Modules/Usuario/Form/Usuario';
import { Person, Email, Badge, VpnKey } from '@mui/icons-material';

export default function PerfilPage() {
  const [user, setUser] = useState<UserLoginInterface | null>(null);

  useEffect(() => {
    setUser(UserLocalStorage());
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e3a8a' }}>
        Meu Perfil
      </Typography>
      <Breadcrumb data_breadcrumb={[{ label: 'Configurações', link: '#' }, { label: 'Meu Perfil', link: 'perfil' }]} />

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 20px',
                bgcolor: '#1e3a8a',
                fontSize: '3rem',
                boxShadow: '0 10px 20px rgba(30, 58, 138, 0.2)'
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{user.email}</Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ textAlign: 'left', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <Badge sx={{ color: '#1e3a8a' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">ID do Usuário</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>#{user.id}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <Email sx={{ color: '#1e3a8a' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">E-mail Principal</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.email}</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <VpnKey color="primary" /> Editar Informações
            </Typography>
            <UsuarioForm onSuccess={() => {}} user_id={user.id} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
