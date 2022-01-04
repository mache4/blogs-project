import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from './navbar';

interface Props {
    children: JSX.Element,
    bgc?: string
};

const Layout: NextPage<Props> = (props) => {
    backgroundColor: ;
    return (
        <div className="layout">
            <Head>
                <title>Blogs</title>
                {/* <style>{`
                    body {
                        background-color: ${props.bgc ? `#${props.bgc}` : '#B2DBFF'};
                    }
                `}</style> */}
            </Head>
            <Navbar />
            <div className="content">
                {props.children}
            </div>
        </div>
    );
};

export default Layout;