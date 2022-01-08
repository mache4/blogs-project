import React, { useRef, useState } from 'react';
import { NextPage } from "next";
import { Avatar, Button, TextField, Box, Typography, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import DescriptionIcon from '@mui/icons-material/Description';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/actions/posts";

type Props = {
    show: boolean;
    hide: any;
}

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

const CreatePost: NextPage<Props> = ({ show, hide }) => {
    const pageRef = useRef<any>();
    const titleRef = useRef<any>();
    const contentRef = useRef<any>();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state.authReducer.authData?.result);
    const [error, setError] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        if ((!titleRef.current.value || titleRef.current.value === "") && (!contentRef.current.value || contentRef.current.value === ""))
            return setError("Enter data.");
        if (!titleRef.current.value || titleRef.current.value === "")
            return setError("Enter post title.");
        if (!contentRef.current.value || contentRef.current.value === "")
            return setError("Enter post content.");
        if (!userInfo?.email)
            return setError("You are not authenticated.");
        dispatch(createPost({
            author: {
                email: userInfo.email
            },
            title: titleRef.current.value,
            content: contentRef.current.value
        }));

        titleRef.current.value = "";
        contentRef.current.value = "";
        hide();
    }

    return (
        <div className="create-post" ref={pageRef} style={{
            height: show ? pageRef.current?.scrollHeight : 0,
            width: "100%",
            backgroundColor: "#F3E5F5"
        }}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{
                        margin: "15px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "25px"
                    }}>
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}><DescriptionIcon /></Avatar>
                        <Typography component="h1" variant="h5">Create Post</Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            {error}
                            <TextField
                                inputRef={titleRef}
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                autoComplete="title" />
                            <TextField
                                inputRef={contentRef}
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rows={10}
                                label="Content"
                                name="content" />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                Submit Post
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default CreatePost;
