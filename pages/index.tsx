import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../components/layout';
import { getPosts } from '../redux/actions/posts';

const Home: NextPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Layout>
            <div className="app" style={{ marginTop: "80px" }}>
                <h1>AJDE PLS</h1>
            </div>
        </Layout>
    );
}

export default Home;
