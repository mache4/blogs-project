import type { NextPage } from 'next';
import Navbar from './navbar';

interface Props {
    children: JSX.Element
};

const Layout: NextPage<Props> = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;