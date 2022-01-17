import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { AppBar, Box, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../constants/actionTypes";
import { useRouter } from "next/router";
import decode from 'jwt-decode';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Popper from '@mui/material/Popper';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import type { NextPage } from 'next';

const theme = createTheme({
    palette: {
        primary: {
            light: '#fff',
            main: '#f3e5f5',
            dark: '#e1bee7',
            contrastText: '#7b1fa2'
        },
        secondary: {
            light: '#f3e5f5',
            main: '#ab47bc',
            dark: '#7b1fa2',
            contrastText: '#fff'
        }
    },
});

const settings = ['Profile', 'Logout'];

const Navbar: NextPage = () => {
    const userData = useSelector((state: any) => state.authReducer.authData);
    const router = useRouter();
    const dispatch = useDispatch();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = useCallback(() => {
        localStorage.clear();
        dispatch({ type: LOGOUT });

        router.push("/signin");
    }, [dispatch, router]);

    useEffect(() => {
        const token = userData?.token;

        if (token) {
            const decodedToken: any = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
    }, [router.pathname, logout, userData]);

    return (
        <ThemeProvider theme={theme}>
            <AppBar className="navbar" color="secondary" sx={{
                padding: "15px 25px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Box>
                    <Typography variant="h4" sx={{ fontStyle: "italic" }}><Link href="/">Blogs</Link></Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    {!userData?.result ?
                        <Link href="/signin" passHref={true}><Button variant="contained" href="/signin" color="primary" className="signin-btn">Sign in</Button></Link> :
                        <>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={`/${userData.result.profilePicture}`} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} sx={{ color: setting === "Logout" ? "red" : "inherit" }} onClick={() => {
                                        if (setting === "Logout") logout();
                                        if (setting === "Profile") router.push("/profile");
                                    }}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    }
                </Box>
            </AppBar>
        </ThemeProvider>
    );
}

export default Navbar;