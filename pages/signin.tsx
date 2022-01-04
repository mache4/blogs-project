import * as React from "react";
import { useDispatch } from "react-redux";
import { signin } from "../redux/actions/auth";
import { useRouter } from "next/router"

import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../components/layout";

const theme = createTheme({
    palette: {
        primary: {
            light: "#f3e5f5",
            main: "#ab47bc",
            dark: "#7b1fa2",
            contrastText: "#fff",
        },
        secondary: {
            light: "#fff",
            main: "#ab47bc",
            dark: "#e1bee7",
            contrastText: "#7b1fa2",
        }
    }
});

export default function Signin() {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(signin({
            email: data.get("email"),
            password: data.get("password"),
        }, router));
    };

    return (
        <Layout>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" sx={{ marginTop: "125px" }}>
                    <CssBaseline />
                    <Box sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}><LockOutlinedIcon /></Avatar>
                        <Typography component="h1" variant="h5">Sign in</Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password" />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">Sign in using Google</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">{"Don't have an account? Sign Up"}</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Layout>
    );
}