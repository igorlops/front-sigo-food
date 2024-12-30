'use client'

import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, ListItemIcon } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../data/context/AuthContext';
import { ReactNode } from 'react';
import { Category, Groups, Inventory2, Logout } from '@mui/icons-material';

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
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
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
          <ListItem className='cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-amber-300 active:bg-amber-500' component="button" onClick={() => router.push('/dashboard/produto')}>
            <ListItemIcon><Inventory2/></ListItemIcon>
            <ListItemText primary="Produto" />
          </ListItem>
          <ListItem className='cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-amber-300 active:bg-amber-500' component="button" onClick={() => router.push('/dashboard/categoria')}>
            <ListItemIcon><Category/></ListItemIcon>
            <ListItemText primary="Categoria" />
          </ListItem>
          <ListItem className='cursor-pointer transition duration-150 ease-out hover:ease-in hover:bg-amber-300 active:bg-amber-500' component="button" onClick={() => router.push('/dashboard/clientes')}>
            <ListItemIcon><Groups/></ListItemIcon>
            <ListItemText primary="Clientes" />
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
      >
        {children}
      </Box>
    </Box>
  );
}
