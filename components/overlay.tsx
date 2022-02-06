import type { NextPage } from 'next';
interface Props {
    show: boolean,
    clicked: any
}

const Overlay: NextPage<Props> = (props) => {
    return (
        <div className="overlay" onClick={props.clicked} style={{
            opacity: props.show ? 0.6 : 0,
            zIndex: props.show ? 100 : -1,
        }}></div>
    );
}

export default Overlay;