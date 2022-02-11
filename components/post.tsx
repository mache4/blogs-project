import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Typography } from '@mui/material';
import PostModal from "../components/post-modal";
import Overlay from './overlay';

type Props = {
    author: any,
    id?: any,
    title: any,
    content: any,
    createdAt?: any
}

const Post: NextPage<Props> = ({ author, title, content, createdAt }) => {
    const router = useRouter();
    const [modal, setModal] = useState(false);

    const fun = (number: any) => {
        if (number < 10)
            number = '0' + number;
        return number;
    }

    let date = new Date(createdAt);
    let minutes = fun(date.getMinutes());
    let hours = fun(date.getHours());
    let day = fun(date.getDate());
    let month = fun(date.getMonth() + 1);
    let year = fun(date.getFullYear());

    return (
        <div className="post">
            <Typography variant="h4" className="post-title" onClick={() => setModal(true)}>{title}</Typography>
            <Typography variant="h6" className="post-author"><span onClick={() => router.push(`/u/${author?._id}`)}>@{author?.username}</span></Typography>
            <Typography variant="h5" className="post-content">{content.length > 225 ? content.substring(0, 225) + "..." : content}</Typography>
            <Typography variant="h6" className="post-date">{hours}:{minutes} | {day}.{month}.{year}</Typography>

            <PostModal
                show={modal}
                close={() => setModal(false)}
                author={author}
                title={title}
                content={content} />

            <Overlay show={modal} clicked={() => setModal(false)} />
        </div>
    );
}

export default Post;