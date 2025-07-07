import { useAuth } from "@/app/data/context/AuthContext";
import { UserLoginInterface } from "@/app/data/utils/const/User";
import { Logout } from "@mui/icons-material";
import { Avatar, Button, Icon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

interface UserProps {
    user: UserLoginInterface | null;
}
export default function ProfileComponent({user}:UserProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openPopper, setOpenPopper] = useState<boolean>(false);
    const { setLogout } = useAuth();

    const handleClickPopper = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenPopper(!openPopper);
    };
    const handleCloseMenuPopper = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setLogout();
    }
    
    const id = openPopper ? 'simple-popper' : undefined;
    return (
        <>
            <Button onClick={handleClickPopper}  aria-describedby={id} type='button'>
                <Avatar sx={{bgcolor: user?.photo_profile ? user.photo_profile : user?.primary_color}}>{user?.name.substring(0,1)}</Avatar>
            </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenuPopper}
            >
                <MenuItem onClick={() => console.log("Clicado Profile")}>Profile</MenuItem>
                <MenuItem onClick={() => console.log("MyAccount")}>My account</MenuItem>
                <MenuItem onClick={handleLogout} sx={{display:"flex",alignItems:"center"}}><Icon sx={{display:"flex",alignItems:"center"}}><Logout/></Icon>Logout</MenuItem>
            </Menu>
        </>
    )
}