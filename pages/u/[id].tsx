import React, { useState } from 'react';
import axios from "axios";
import Layout from '../../components/layout';
import { NextPage } from 'next';
import Post from "../../components/post";
import Loader from 'react-loader-spinner';

import PostModal from "../../components/post-modal";
import Overlay from "../../components/overlay";

type Props = {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    posts: Array<object>
}

const API = axios.create({ baseURL: 'http://localhost:3000/api' });

export const getStaticPaths = async () => {
    const result = await API.get("/users");

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
    const result = await API.get(`/users/${id}`);
    const posts = await API.get(`/user/${id}/posts`);
    return {
        props: {
            email: result.data[0].email,
            username: result.data[0].username,
            firstName: result.data[0].firstName,
            lastName: result.data[0].lastName,
            posts: posts.data.reverse()
        }
    };
};

const User: NextPage<Props> = ({ email, username, firstName, lastName, posts }) => {
    const [modal, setModal] = useState(false);

    return (
        <Layout title={`@${username}`}>
            <div className="user-profile">
                <div className="user-info">
                    <p className="user-username">@{username}</p>
                    <p className="user-name">{firstName} {lastName}</p>
                </div>
                <div className="user-posts posts">
                    {posts ? posts.length !== 0 ? posts.map((post: any) => (
                        [
                            <Post
                                key={post._id}
                                author={post.author}
                                id={post._id}
                                title={post.title}
                                content={post.content}
                                createdAt={post.createdAt} />,
                            <PostModal
                                key={post._id}
                                show={modal}
                                close={() => setModal(false)}
                                author={post.author}
                                title={post.title}
                                content={post.content} />
                        ]
                    )) : <h1 style={{ color: "#fff", fontWeight: "400" }}>This user has no posts yet...</h1> : <Loader
                        type="Oval"
                        color="#fff"
                        height={100}
                        width={100}
                    />}
                </div>
                <Overlay show={modal} clicked={() => setModal(false)} />
            </div>
        </Layout>
    );
}

export default User;