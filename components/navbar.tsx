import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AppBar, Box, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../constants/actionTypes";
import { useRouter } from "next/router";
import decode from 'jwt-decode';

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

const Navbar: NextPage = () => {
    const userData = useSelector((state: any) => state.authReducer);
    const router = useRouter();
    const dispatch = useDispatch();
    const [user, setUser] = useState((typeof window !== 'undefined' && JSON.parse(localStorage.getItem('profile') || "{}")));

    const logout = useCallback(() => {
        localStorage.clear();
        dispatch({ type: LOGOUT });

        // setModal(true);
        // window.setTimeout(() => {
        //     setModal(false);
        // }, 1000);

        router.push("/signin");
    }, [dispatch, router]);

    useEffect(() => {
        const profile: any = localStorage.getItem('profile');
        setUser(JSON.parse(profile));
    }, [userData]);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken: any = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
                // router.push("/signin");
            }
        }
    }, [router.pathname, logout, user?.token]);

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
                    {/* <Typography variant="h5" sx={{ marginRight: "30px" }}><Link href="/">Home</Link></Typography>
                    <Typography variant="h5" sx={{ marginRight: "30px" }}><Link href="/create-post">Create Post</Link></Typography> */}
                    {!user || user === "{}" ?
                        <Link href="/signin" passHref={true}><Button variant="contained" href="/signin" color="primary" className="signin-btn">Sign in</Button></Link> :
                        <Button variant="contained" color="primary" className="logout-btn" onClick={logout}>Log out</Button>
                    }
                </Box>
            </AppBar>
        </ThemeProvider>
    );
}

export default Navbar;