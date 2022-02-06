import "../styles/globals.scss";
import "../styles/home.scss";
import "../styles/create-post.scss";
import "../styles/posts.scss";
import "../styles/error-modal.scss";
import "../styles/profile.scss";
import "../styles/user-profile.scss";
import "../styles/post-modal.scss";
import "../styles/overlay.scss";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";

const MyApp = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
)

export default MyApp
