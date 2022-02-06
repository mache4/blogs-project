import React from 'react';
import { NextPage } from 'next';
import { Close } from '@mui/icons-material';

type Props = {
    show: boolean,
    close: any,
    author: any,
    title: string,
    content: string
}

const PostModal: NextPage<Props> = ({ author, title, content, show, close }) => {

    return (
        <div className="post-modal" style={{
            transform: show ? "translate(-50%, -50%)" : "translate(-50%, -500%)"
        }}>
            <h1 className="post-title">{title}</h1>
            <p className="post-author">@{author.username}</p>
            <p className="post-content">{content}</p>
            <p className="close-modal-btn" onClick={close}><Close /></p>
        </div>
    );
}

export default PostModal;