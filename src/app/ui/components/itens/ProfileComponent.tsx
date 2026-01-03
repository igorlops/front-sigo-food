import { useAuth } from "@/app/data/context/AuthContext";
import { UserLoginInterface } from "@/app/data/utils/const/User";
import { Logout, Person, Settings as SettingsIcon } from "@mui/icons-material";
import {
    Avatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Box,
    Typography
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserProps {
    user: UserLoginInterface | null;
    open: boolean;
}

const colors = {
    accentYellow: '#fcd34d',
};

export default function ProfileComponent({ user, open }: UserProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { setLogout } = useAuth();
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setLogout();
        handleClose();
    };

    const handleProfile = () => {
        router.push("/dashboard/perfil");
        handleClose();
    };

    const handleSettings = () => {
        router.push("/dashboard/restaurante");
        handleClose();
    };

    return (
        <Box>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(252, 211, 77, 0.1)',
                        transform: 'translateX(4px)',
                    },
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: user?.photo_profile ? user.photo_profile : user?.primary_color || colors.accentYellow,
                            width: 32,
                            height: 32,
                            fontSize: '1rem',
                        }}
                    >
                        {user?.name.substring(0, 1)}
                    </Avatar>
                </ListItemIcon>

                {open && (
                    <ListItemText
                        primary={user?.name}
                        secondary={user?.email}
                        sx={{
                            opacity: open ? 1 : 0,
                            color: 'white',
                            '& .MuiTypography-root': {
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            },
                            '& .MuiListItemText-secondary': {
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.75rem',
                            }
                        }}
                    />
                )}
            </ListItemButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: open ? 'left' : 'right',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        bgcolor: '#1e3a8a',
                        color: 'white',
                        ml: open ? 1 : 0,
                        minWidth: 200,
                    }
                }}
            >
                <MenuItem
                    onClick={handleProfile}
                    sx={{
                        gap: 2,
                        px: 2,
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: 'rgba(252, 211, 77, 0.1)',
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: 'white', minWidth: 0 }}>
                        <Person />
                    </ListItemIcon>
                    Meu Perfil
                </MenuItem>

                <MenuItem
                    onClick={handleSettings}
                    sx={{
                        gap: 2,
                        px: 2,
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: 'rgba(252, 211, 77, 0.1)',
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: 'white', minWidth: 0 }}>
                        <SettingsIcon />
                    </ListItemIcon>
                    Configurações
                </MenuItem>

                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        gap: 2,
                        px: 2,
                        py: 1.5,
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#ff6b6b',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: '#ff6b6b', minWidth: 0 }}>
                        <Logout />
                    </ListItemIcon>
                    Sair
                </MenuItem>
            </Menu>
        </Box>
    );
}