import React from 'react';
import axios from "axios";
import Layout from '../../components/layout';
import { NextPage } from 'next';

type Props = {
    author: any,
    title: string,
    content: string
}

const API = axios.create({ baseURL: 'http://localhost:3000/api' }); // ne razumem zasto mora http://localhost:3000

export const getStaticPaths = async () => {
    const result = await API.get("/posts");

    const paths = result.data.map((i: any) => {
        return { params: { id: i._id.toString() } };
    });

    return {
        paths: paths,
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {
    const id = context.params.id;
    const result = await API.get(`/posts/${id}`);
    return {
        props: {
            author: result.data[0].author,
            title: result.data[0].title,
            content: result.data[0].content,
        }
    };
};

const Post: NextPage<Props> = ({ author, title, content }) => {
    return (
        <Layout title="Post">
            <div className="user-profile">
                <h1 className="post-title">{title}</h1>
                <p className="post-author">{author.username}</p>
                <p className="post-content">{content}</p>
            </div>
        </Layout>
    );
}

export default Post;