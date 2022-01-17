import React from 'react';
import { NextPage } from "next";
import ErrorIcon from '@mui/icons-material/Error';

type Props = {
    children: any,
    show: boolean
}

const ErrorModal: NextPage<Props> = ({ children, show }) => {
    return (
        <div className="error-modal" style={{
            transform: show ? "translateX(0)" : "translateX(200%)"
        }}>
            <ErrorIcon />
            <p className="error">{children}</p>
        </div>
    )
}

export default ErrorModal;