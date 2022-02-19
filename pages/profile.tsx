import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Layout from '../components/layout';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPosts } from '../redux/actions/posts';
import Post from "../components/post";
import Loader from 'react-loader-spinner';

import PostModal from "../components/post-modal";
import Overlay from '../components/overlay';

export default function Profile() {
    const userData = useSelector((state: any) => state.authReducer.authData?.result);
    const userPostsData = useSelector((state: any) => state.userPostsReducer.postsData);
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserPosts(userData?._id));
    }, [userData, dispatch]);

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
                        <div className="data">
                            <Image
                                src={`/${userData.profilePicture}`}
                                className="profile-picture"
                                height={250}
                                width={250}
                                alt="profile-picture" />

                            <table className="user-data">
                                <tbody>
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="user-posts posts">
                        {/* <p className="title">Your Posts</p> */}
                        {userPostsData ? userPostsData.length !== 0 ? userPostsData.map((post: any) => (
                            <div className="container" key={post._id}>
                                <Post
                                    author={""}
                                    id={post._id}
                                    title={post.title}
                                    content={post.content}
                                    createdAt={post.createdAt} />
                            </div>
                        )) : <h1 style={{ color: "#fff", fontWeight: "400" }}>You have no posts yet...</h1> : <Loader
                            type="Oval"
                            color="#fff"
                            height={100}
                            width={100}
                        />}
                    </div>
                </div>}
                <Overlay show={modal} clicked={() => setModal(false)} />
            </div>
        </Layout>
    )
}
