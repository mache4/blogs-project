import type { NextPage } from 'next';
import { useState } from "react";
import Posts from '../components/posts';
import Layout from '../components/layout';
import CreatePost from '../components/create-post';
import { Button } from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

const Home: NextPage = () => {
    const [createPost, setCreatePost] = useState(false);

    return (
        <Layout>
            <div className="home">
                <CreatePost show={createPost} />
                <Button
                    color="secondary"
                    onClick={() => setCreatePost(!createPost)}
                    fullWidth >CREATE POST {createPost ? <ArrowDropUp /> : <ArrowDropDown />}</Button>
                <Posts />
            </div>
        </Layout>
    );
}

export default Home;
