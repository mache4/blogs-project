import React, { useState } from 'react';
import Layout from '../../components/layout';
import { NextPage } from 'next';
import Post from "../../components/post";
import Loader from 'react-loader-spinner';
import { getUsers } from '../api/users';
import { getUserById } from '../api/users/[id]';
import { getUsersPosts } from '../api/users/[id]/posts';

import PostModal from "../../components/post-modal";
import Overlay from "../../components/overlay";

type Props = {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    posts: Array<object>
}

export const getStaticPaths = async () => {
    const result: any = await getUsers();

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
    const result: any = await getUserById(id);
    const posts: any = await getUsersPosts(id);

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
                        <div className="container" key={post._id}>
                            <Post
                                author={post.author}
                                id={post._id}
                                title={post.title}
                                content={post.content}
                                createdAt={post.createdAt} />
                            <PostModal
                                show={modal}
                                close={() => setModal(false)}
                                author={post.author}
                                title={post.title}
                                content={post.content} />
                        </div>
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