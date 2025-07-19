'use client'

import * as React from 'react'; // Importar React para usar useState, etc.
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton'; // Adicionado para MiniDrawer
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Drawer, AppBar, DrawerHeader } from '../ui/components/itens/AppBarMenu'
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { AccountBox, AddBox, Category, Groups, Inventory, ListAlt} from '@mui/icons-material';

import { useTheme } from '@mui/material';
import ProfileComponent from '../ui/components/itens/ProfileComponent';
import { UserLocalStorage, UserLoginInterface } from '../data/utils/const/User';


// ---
// ## DashboardLayout com MiniDrawer
// ---

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const theme = useTheme(); // Para usar as direções do tema no ícone da seta
  const [open, setOpen] = React.useState(false); // Estado para controlar a abertura/fechamento do drawer
  const [user, setUser] = React.useState<UserLoginInterface | null>(null);

  React.useEffect(() => {
    setUser(UserLocalStorage())
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Defina os itens do seu menu
  const menuItems = [
    { text: "Produto", icon: <AddBox />, path: "/dashboard/produtos" },
    { text: "Categoria", icon: <Category />, path: "/dashboard/categorias" },
    { text: "Clientes", icon: <Groups />, path: "/dashboard/clientes" },
    { text: "Pedidos", icon: <ListAlt />, path: "/dashboard/pedidos" },
    { text: "Usuários", icon: <AccountBox />, path: "/dashboard/usuarios" },
    { text: "Estoques", icon: <Inventory />, path: "/dashboard/estoques" },
  ];
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline /> {/* Reset de CSS básico do Material-UI */}

      <AppBar position="fixed" open={open} sx={{display:"flex", alignItems:"center",flexDirection:"row", justifyContent:"space-between"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          </Toolbar>
          <Typography variant="h6" noWrap component="div">
            Painel Administrativo
          </Typography>
          <ProfileComponent user={user}/> 
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => router.push(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader /> {/* Necessário para o conteúdo não ficar embaixo da AppBar */}
        {children}
      </Box>
    </Box>
  );
}