import React from 'react';
import Image from "next/image";
import Layout from '../components/layout';
import { useSelector } from 'react-redux';

export default function Profile() {
    const userData = useSelector((state: any) => state.authReducer.authData.result);

    return (
        <Layout title="Profile">
            <div className="container" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%"
            }}>
                {userData && <div className="profile">
                    <div className="user-info">
                        <Image
                            src={`/${userData.profilePicture}`}
                            className="profile-picture"
                            height={250}
                            width={250}
                            alt="profile-picture" />
                        {/* <p>First Name: <span>{userData.firstName}</span></p>
                            <p>Last Name: <span>{userData.lastName}</span></p>
                            <p>Email: <span>{userData.email}</span></p>
                            <p>Username: <span>{userData.username}</span></p> */}
                        <table className="user-data">
                            <tr>
                                <td>First Name</td>
                                <td>{userData.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{userData.lastName}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{userData.email}</td>
                            </tr>
                            <tr>
                                <td>Username</td>
                                <td>{userData.username}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="user-posts">
                        <p>asd</p>
                    </div>
                </div>}
            </div>
        </Layout>
    )
}
