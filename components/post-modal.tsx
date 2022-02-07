import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Close } from '@mui/icons-material';

type Props = {
    show: boolean,
    close: any,
    author: any,
    title: string,
    content: string
}

const PostModal: NextPage<Props> = ({ author, title, content, show, close }) => {
    const router = useRouter();

    return (
        <div className="post-modal" style={{
            transform: show ? "translate(-50%, -50%)" : "translate(-50%, -500%)"
        }}>
            <h1 className="post-modal-title post-modal-title">{title}</h1>
            <p className="post-modal-author"><span onClick={() => router.push(`/u/${author._id}`)}>@{author.username}</span></p>
            <p className="post-modal-content">{content}</p>
            <p className="close-modal-btn" onClick={close}><Close /></p>
        </div>
    );
}

export default PostModal;