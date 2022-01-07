import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/actions/posts';
import Post from './post';

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Posts() {
    const dispatch = useDispatch();
    const postsData = useSelector((state: any) => state.postsReducer.postsData);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div className="posts">
            <p className="title">Latest Posts</p>
            {postsData && postsData.length !== 0 ? postsData.map((post: any) => (
                <Post
                    key={post._id}
                    author={post.author}
                    title={post.title}
                    content={post.content}
                    createdAt={post.createdAt} />
            )) : <Loader
                type="Puff"
                color="#ab47bc"
                height={100}
                width={100}
                timeout={3000}
            />}
        </div>
    )
}
