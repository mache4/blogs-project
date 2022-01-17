import type { NextPage } from 'next';
import { useState } from "react";
import Posts from '../components/posts';
import Layout from '../components/layout';
import CreatePost from '../components/create-post';
import { Button } from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
    }
});

const Home: NextPage = () => {
    const [createPost, setCreatePost] = useState(false);

    return (
        <Layout title="Home">
            <div className="home">
                <CreatePost show={createPost} hide={() => setCreatePost(false)} />
                <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setCreatePost(!createPost)}
                        sx={{
                            width: "100%",
                            margin: "0 auto",
                            borderRadius: "0"
                        }}>CREATE POST {createPost ? <ArrowDropUp /> : <ArrowDropDown />}</Button>
                </ThemeProvider>
                <Posts />
            </div>
        </Layout>
    );
}

export default Home;

/*
    <button className="create-post-btn" onClick={() => setCreatePost(!createPost)}>
        CREATE POST {createPost ? <ArrowDropUp /> : <ArrowDropDown />}
    </button>
*/