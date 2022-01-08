import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { signup } from "../redux/actions/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

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

export default function Signup() {
    const router = useRouter();
    const dispatch = useDispatch();
    const errorData = useSelector((state: any) => state.authReducer.error);
    const [error, setError] = useState("");

    const firstNameRef = useRef<any>();
    const lastNameRef = useRef<any>();
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();

    useEffect(() => {
        if (errorData || errorData !== "")
            setError(errorData);
        else
            setError("");
    }, [errorData]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if (!emailRef.current.value && !passwordRef.current.value)
            return setError("Enter data");
        if (!emailRef.current.value)
            return setError("Enter email");
        if (!passwordRef.current.value)
            return setError("Enter password");
        if (errorData || errorData !== "")
            setError(errorData);
        dispatch(signup({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }, router));
    };

    return (
        <Layout>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" sx={{
                    display: "flex",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "25px",
                            backgroundColor: "#fff",
                            borderRadius: "5px"
                        }}>
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}><LockOutlinedIcon /></Avatar>
                        <Typography component="h1" variant="h5">Sign up</Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            {error}
                            <Head>
                                <title>Blogs | Sign up</title>
                            </Head>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputRef={firstNameRef}
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        inputRef={lastNameRef}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={emailRef}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        inputRef={passwordRef}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password" />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs>
                                    {/* <Link href="/signin" variant="body2">Sign up using Google.</Link> */}
                                </Grid>
                                <Grid item>
                                    <Link href="/signin" variant="body2">Already have an account? Sign in</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Layout>
    );
}