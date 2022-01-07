import React from 'react';
import { NextPage } from 'next';
import { Typography } from '@mui/material';

type Props = {
    author: {
        email: string
    },
    title: string,
    content: string,
    createdAt: any
}

const Post: NextPage<Props> = ({ author, title, content, createdAt }) => {
    return (
        <div className="post">
            <Typography variant="h4" className="post-title">{title}</Typography>
            <Typography variant="h6" className="post-author">{author.email}</Typography>
            <Typography variant="h5" className="post-content">{content}</Typography>
            {/* <Typography variant="h5" className="post-date">{content}</Typography> */}
            {console.log(new Date())}
        </div>
    );
}

export default Post;