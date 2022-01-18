import React from 'react';
import axios from "axios";
import Layout from '../../components/layout';
import { NextPage } from 'next';

type Props = {
    email: string,
    username: string,
    firstName: string,
    lastName: string
}

// ne razumem zasto mora http://localhost:3000 (vljd zato sto nije u root-u nego je kao subroute) (koje sranje)
const API = axios.create({ baseURL: 'http://localhost:3000/api' });

export const getStaticPaths = async () => {
    const result = await API.get("/users");

    const paths = result.data.map((i: any) => {
        return { params: { id: i._id.toString() } };
    });

    return {
        paths: paths,
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {
    const id = context.params.id;
    const result = await API.get(`/users/${id}`);
    return {
        props: {
            email: result.data[0].email,
            username: result.data[0].username,
            firstName: result.data[0].firstName,
            lastName: result.data[0].lastName
        }
    };
};

const User: NextPage<Props> = ({ email, username, firstName, lastName }) => {
    return (
        <Layout title={`@${username}`}>
            <div className="user-profile">
                <h1 className="post-title">{email}</h1>
                <p className="post-author">{username}</p>
                <p className="post-content">{firstName} {lastName}</p>
            </div>
        </Layout>
    );
}

export default User;