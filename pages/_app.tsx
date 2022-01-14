import "../styles/globals.scss";
import "../styles/home.scss";
import "../styles/create-post.scss";
import "../styles/posts.scss";
import "../styles/error-modal.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";

const MyApp = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
)

export default MyApp
