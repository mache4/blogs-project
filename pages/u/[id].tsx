import React, { useState } from 'react';
import Layout from '../../components/layout';
import { NextPage } from 'next';
import { Typography } from '@mui/material';

import dbConnect from '../../lib/mongodb';
import Post from '../../models/post';
import Userr from '../../models/user';
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';

import PostModal from "../../components/post-modal";
import Overlay from "../../components/overlay";

type Props = {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    posts: any
}


export const getStaticPaths = async () => {
    dbConnect();
    const result: any = await Userr.find();

    const paths = result.map((i: any) => {
        return { params: { id: i._id.toString() } };
    });

    return {
        paths: paths,
        fallback: true
    }
}

export const getStaticProps = async (context: any) => {
    dbConnect();
    const id = context.params.id;
    const result = await Userr.find({ _id: id });
    let posts: any = await Post.find({ 'author._id': id });

    return {
        props: {
            email: result[0].email,
            username: result[0].username,
            firstName: result[0].firstName,
            lastName: result[0].lastName,
            posts: JSON.stringify(posts)
        }
    };
};

const User: NextPage<Props> = ({ email, username, firstName, lastName, posts }) => {
    const [modal, setModal] = useState(false);
    const router = useRouter();

    const fun = (number: any) => {
        if (number < 10)
            number = '0' + number;
        return number;
    }

    return (
        <Layout title={`@${username}`}>
            <div className="user-profile">
                <div className="user-info">
                    <p className="user-username">@{username}</p>
                    <p className="user-name">{firstName} {lastName}</p>
                </div>
                <div className="user-posts posts">
                    {posts ? posts?.length !== 0 ? JSON.parse(posts)?.map((p: any) => {
                        let date = new Date(p?.createdAt);
                        let minutes = fun(date.getMinutes());
                        let hours = fun(date.getHours());
                        let day = fun(date.getDate());
                        let month = fun(date.getMonth() + 1);
                        let year = fun(date.getFullYear());

                        return <div className="container" key={p?._id.toString()}>
                            <div className="post">
                                <Typography variant="h4" className="post-title" onClick={() => setModal(true)}>{p?.title}</Typography>
                                <Typography variant="h6" className="post-author"><span onClick={() => router.push(`/u/${p?.author?._id}`)}>@{p?.author?.username}</span></Typography>
                                <Typography variant="h5" className="post-content">{p?.content.length > 225 ? p?.content.substring(0, 225) + "..." : p?.content}</Typography>
                                <Typography variant="h6" className="post-date">{hours}:{minutes} | {day}.{month}.{year}</Typography>
                                <Overlay show={modal} clicked={() => setModal(false)} />
                            </div>
                            <PostModal
                                show={modal}
                                close={() => setModal(false)}
                                author={p?.author}
                                title={p?.title}
                                content={p?.content} />
                        </div>
                    }) : <h1 style={{ color: "#fff", fontWeight: "400" }}>This user has no posts yet...</h1> : <Loader
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