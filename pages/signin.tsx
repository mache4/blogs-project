import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../redux/actions/auth";
import { useRouter } from "next/router"

import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../components/layout";
import ErrorModal from "../components/error-modal";

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
    const errorData = useSelector((state: any) => state.authReducer.error);
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);

    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();

    useEffect(() => {
        if (errorData && errorData !== "") {
            setModal(true);
            animation();
            setError(errorData);
        }

        else
            setError("");
    }, [errorData]);

    const animation = () => {
        setTimeout(() => {
            setModal(false);
        }, 2500);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setModal(false);

        if (!emailRef.current.value && !passwordRef.current.value) {
            setModal(true);
            animation();
            return setError("Enter data.");
        }
        if (!emailRef.current.value) {
            setModal(true);
            animation();
            return setError("Enter email.");
        }
        if (!passwordRef.current.value) {
            setModal(true);
            animation();
            return setError("Enter password.");
        }
        dispatch(signin({
            email: emailRef.current.value,
            password: passwordRef.current.value
        }, router));
    };

    return (
        <Layout title="Sign in">
            <ThemeProvider theme={theme}>
                <ErrorModal show={modal}>
                    {error}
                </ErrorModal>
                <Container component="main" maxWidth="xs" sx={{
                    display: "flex",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <CssBaseline />
                    <Box sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "25px",
                        backgroundColor: "#fff",
                        borderRadius: "5px"
                    }}>
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}><LockOutlinedIcon /></Avatar>
                        <Typography component="h1" variant="h5">Sign in</Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                inputRef={emailRef}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus />
                            <TextField
                                inputRef={passwordRef}
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
                                    {/* <Link href="#" variant="body2">Sign in using Google</Link> */}
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