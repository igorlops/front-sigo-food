'use client'

import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, ListItemIcon } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../data/context/AuthContext';
import { ReactNode } from 'react';
import { AccountBox, AddBox, CarCrash, Category, Groups, Inventory, Inventory2, ListAlt, Logout } from '@mui/icons-material';

const drawerWidth = 240;

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  const handleLogout = () => {
    // Limpar o token e outros dados de autenticação
    localStorage.removeItem('access_token');
    setAuthenticated(false);
    router.push('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }} className='bg-amber-300 text-black'>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Painel administrativo
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List className='flex flex-col gap-3'>
          <ListItem className='cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-amber-300 active:bg-amber-500' component="button" onClick={() => router.push('/dashboard/produtos')}>
            <ListItemIcon><AddBox/></ListItemIcon>
            <ListItemText primary="Produto" />
          </ListItem>
          <ListItem className='cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-amber-300 active:bg-amber-500' component="button" onClick={() => router.push('/dashboard/categorias')}>
            <ListItemIcon><Category/></ListItemIcon>
            <ListItemText primary="Categoria" />
          </ListItem>
          <ListItem className='cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-amber-300 active:bg-amber-500' component="button" onClick={() => router.push('/dashboard/clientes')}>
            <ListItemIcon><Groups/></ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItem>
          <ListItem className='cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-amber-300 active:bg-amber-500' component="button" onClick={() => router.push('/dashboard/pedidos')}>
            <ListItemIcon><ListAlt/></ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItem>
          <ListItem className='cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-amber-300 active:bg-amber-500' component="button" onClick={() => router.push('/dashboard/usuarios')}>
            <ListItemIcon><AccountBox/></ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItem>
          <ListItem className='cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-amber-300 active:bg-amber-500' component="button" onClick={() => router.push('/dashboard/estoques')}>
            <ListItemIcon><Inventory/></ListItemIcon>
            <ListItemText primary="Estoques" />
          </ListItem>
          <ListItem className='cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-amber-300 active:bg-amber-500' component="button" onClick={handleLogout}>
            <ListItemIcon><Logout/></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          marginLeft: `${drawerWidth}px`,
          height: '100vh',
          overflow: 'auto',
        }}
        className='mt-[5em]'
      >
        {children}
      </Box>
    </Box>
  );
}
