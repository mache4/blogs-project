import React, { useEffect, useState } from 'react';
import { NextPage } from "next";

type Props = {
    children: any,
    show: boolean
}

const ErrorModal: NextPage<Props> = ({ children, show }) => {
    const [showModal, setShowModal] = useState(show);

    useEffect(() => {
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    }, []);

    return (
        <div className="error-modal" style={{
            transform: showModal ? "translateX(0)" : "translateX(200%)"
        }}>
            {children}
        </div>
    )
}

export default ErrorModal;