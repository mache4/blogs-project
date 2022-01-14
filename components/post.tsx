import React from 'react';
import { NextPage } from 'next';
import { Typography } from '@mui/material';

type Props = {
    author: {
        email: string,
        username: string
    },
    title: string,
    content: string,
    createdAt: any
}

const Post: NextPage<Props> = ({ author, title, content, createdAt }) => {
    const fun = (number: any) => {
        if (number < 10)
            number = '0' + number;
        return number;
    }

    let date = new Date(createdAt);
    let seconds = fun(date.getSeconds());
    let minutes = fun(date.getMinutes());
    let hours = fun(date.getHours());
    let day = fun(date.getDate());
    let month = fun(date.getMonth() + 1);
    let year = fun(date.getFullYear());

    return (
        <div className="post">
            <Typography variant="h4" className="post-title">{title}</Typography>
            <Typography variant="h6" className="post-author">@{author.username}</Typography>
            <Typography variant="h5" className="post-content">{content.length > 225 ? content.substring(0, 225) + "..." : content}</Typography>
            <Typography variant="h6" className="post-date">{hours}:{minutes} | {day}.{month}.{year}</Typography>
            {console.log(new Date())}
        </div>
    );
}

export default Post;