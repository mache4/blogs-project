import type { NextPage } from 'next';
import Navbar from './navbar';
import Head from "next/head";

interface Props {
    children: JSX.Element,
    title: string
};

const Layout: NextPage<Props> = ({ children, title }) => {
    return (
        <div className="layout">
            <Head>
                <title>Blogs | {title}</title>
            </Head>
            <Navbar />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;