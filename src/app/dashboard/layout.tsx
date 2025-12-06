'use client'

import * as React from 'react';
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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Drawer, AppBar, DrawerHeader } from '../ui/components/itens/AppBarMenu'
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import {
  AccountBox,
  AddBox,
  Category,
  Groups,
  Inventory,
  ListAlt,
  Smartphone,
  Kitchen,
  AttachMoney,
  Payment,
  Restaurant,
  Settings,
  Person
} from '@mui/icons-material';

import { useTheme } from '@mui/material';
import ProfileComponent from '../ui/components/itens/ProfileComponent';
import { UserLocalStorage, UserLoginInterface } from '../data/utils/const/User';

// Cores do tema SIGO FOOD
const colors = {
  primaryBlue: '#1e3a8a', // blue-900
  secondaryStone: '#44403c', // stone-700
  accentYellow: '#fcd34d', // amber-300
  bgLight: '#fafaf9', // stone-50
  bgDark: '#0c1e3f', // blue-950
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [configOpen, setConfigOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<UserLoginInterface | null>(null);

  React.useEffect(() => {
    setUser(UserLocalStorage())
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleConfigClick = (event: React.MouseEvent<HTMLElement>) => {
    if (open) {
      // Se o drawer está aberto, usa collapse
      setConfigOpen(!configOpen);
    } else {
      // Se o drawer está fechado, abre o menu popover
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  const menuItems = [
    { text: "Produtos", icon: <AddBox />, path: "/dashboard/produtos" },
    { text: "Categorias", icon: <Category />, path: "/dashboard/categorias" },
    { text: "Clientes", icon: <Groups />, path: "/dashboard/clientes" },
    { text: "Pedidos", icon: <ListAlt />, path: "/dashboard/pedidos" },
    { text: "Usuários", icon: <AccountBox />, path: "/dashboard/usuarios" },
    { text: "Estoque", icon: <Inventory />, path: "/dashboard/estoques" },
  ];

  const configItems = [
    { text: "Pagamentos", icon: <Payment />, path: "/dashboard/pagamentos" },
    { text: "Taxas", icon: <AttachMoney />, path: "/dashboard/taxas" },
    { text: "Ingredientes", icon: <Kitchen />, path: "/dashboard/ingredientes" },
    { text: "Meu Perfil", icon: <Person />, path: "/dashboard/perfil" },
    { text: "Restaurante", icon: <Restaurant />, path: "/dashboard/restaurante" },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: colors.bgLight }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: `linear-gradient(135deg, ${colors.primaryBlue} 0%, ${colors.bgDark} 100%)`,
          boxShadow: '0 4px 20px rgba(30, 58, 138, 0.15)',
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(252, 211, 77, 0.1)',
                transform: 'rotate(90deg)',
              },
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo no AppBar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                bgcolor: colors.accentYellow,
                p: 0.5,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Smartphone sx={{ color: colors.primaryBlue, fontSize: 20 }} />
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                letterSpacing: '-0.5px',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              SIGO <span style={{ color: colors.accentYellow }}>FOOD</span>
            </Typography>
          </Box>
        </Toolbar>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 600,
            letterSpacing: '0.5px',
            display: { xs: 'none', md: 'block' }
          }}
        >
          Painel Administrativo
        </Typography>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            background: `linear-gradient(180deg, ${colors.primaryBlue} 0%, ${colors.bgDark} 100%)`,
            borderRight: `1px solid rgba(252, 211, 77, 0.1)`,
            transition: 'all 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
          }
        }}
      >
        <DrawerHeader sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          borderBottom: `1px solid rgba(252, 211, 77, 0.1)`,
        }}>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(252, 211, 77, 0.1)',
                transform: 'rotate(180deg)',
              }
            }}
          >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: 'rgba(252, 211, 77, 0.1)' }} />

        <List sx={{ px: 1, pt: 2 }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  display: 'block',
                  mb: 0.5,
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    backgroundColor: isActive ? 'rgba(252, 211, 77, 0.15)' : 'transparent',
                    borderLeft: isActive ? `3px solid ${colors.accentYellow}` : '3px solid transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(252, 211, 77, 0.1)',
                      transform: 'translateX(4px)',
                      borderLeft: `3px solid ${colors.accentYellow}`,
                    },
                  }}
                  onClick={() => router.push(item.path)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isActive ? colors.accentYellow : 'rgba(255, 255, 255, 0.7)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: colors.accentYellow,
                      }
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: isActive ? colors.accentYellow : 'white',
                      '& .MuiTypography-root': {
                        fontWeight: isActive ? 600 : 400,
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}

          {/* Configurações com Dropdown/Popover */}
          <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
            <ListItemButton
              onClick={handleConfigClick}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                backgroundColor: configOpen ? 'rgba(252, 211, 77, 0.15)' : 'transparent',
                borderLeft: configOpen ? `3px solid ${colors.accentYellow}` : '3px solid transparent',
                '&:hover': {
                  backgroundColor: 'rgba(252, 211, 77, 0.1)',
                  transform: 'translateX(4px)',
                  borderLeft: `3px solid ${colors.accentYellow}`,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: configOpen ? colors.accentYellow : 'rgba(255, 255, 255, 0.7)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Settings />
              </ListItemIcon>
              <ListItemText
                primary="Configurações"
                sx={{
                  opacity: open ? 1 : 0,
                  color: configOpen ? colors.accentYellow : 'white',
                  '& .MuiTypography-root': {
                    fontWeight: configOpen ? 600 : 400,
                  }
                }}
              />
              {open && (configOpen ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />)}
            </ListItemButton>

            {/* Collapse para quando o drawer está aberto */}
            <Collapse in={configOpen && open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {configItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <ListItemButton
                      key={item.text}
                      sx={{
                        pl: 4,
                        minHeight: 40,
                        borderRadius: 2,
                        mx: 1,
                        mb: 0.5,
                        transition: 'all 0.3s ease',
                        backgroundColor: isActive ? 'rgba(252, 211, 77, 0.15)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(252, 211, 77, 0.1)',
                          transform: 'translateX(4px)',
                        },
                      }}
                      onClick={() => router.push(item.path)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 2,
                          color: isActive ? colors.accentYellow : 'rgba(255, 255, 255, 0.6)',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          color: isActive ? colors.accentYellow : 'rgba(255, 255, 255, 0.9)',
                          '& .MuiTypography-root': {
                            fontSize: '0.875rem',
                            fontWeight: isActive ? 600 : 400,
                          }
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </ListItem>

          {/* Menu Popover para quando o drawer está fechado */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{
              '& .MuiPaper-root': {
                bgcolor: colors.primaryBlue,
                color: 'white',
                ml: 1,
              }
            }}
          >
            {configItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <MenuItem
                  key={item.text}
                  onClick={() => handleMenuItemClick(item.path)}
                  sx={{
                    gap: 2,
                    px: 2,
                    py: 1.5,
                    backgroundColor: isActive ? 'rgba(252, 211, 77, 0.15)' : 'transparent',
                    color: isActive ? colors.accentYellow : 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(252, 211, 77, 0.1)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? colors.accentYellow : 'white', minWidth: 0 }}>
                    {item.icon}
                  </ListItemIcon>
                  {item.text}
                </MenuItem>
              );
            })}
          </Menu>
        </List>


        {/* Profile Component fixo no final */}
        <Box sx={{
          mt: 'auto',
          borderTop: `1px solid rgba(252, 211, 77, 0.1)`,
          p: 1,
        }}>
          <ProfileComponent user={user} open={open} />
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: '100vh',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}