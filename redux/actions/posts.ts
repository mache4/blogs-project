import { GET_POSTS, CREATE_POST, GET_USERS_POSTS } from "../../constants/actionTypes";
import axios from "axios";

const API = axios.create({ baseURL: "/api" });

API.interceptors.request.use((req: any) => {
    if (localStorage.getItem("profile"))
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile") || "{}").token}`;
    return req;
});

const posts = () => API.get("/posts");
const post = (postData: any) => API.post("/post", postData);
export const userPosts = (id: any) => API.get(`/user/${id}/posts`);

export const createPost = (postData: any) => async (dispatch: any) => {
    try {
        const { data } = await post(postData);
        dispatch({ type: CREATE_POST, payload: data });
    } catch (error: any) {
        return dispatch({ type: CREATE_POST, error: error.response.data.message });
    }
    try {
        const { data } = await posts();

        dispatch({ type: GET_POSTS, data: data.reverse() });
    } catch (error: any) {
        return dispatch({ type: GET_POSTS, error: error.response.data.message });
    }
}

export const getPosts = () => async (dispatch: any) => {
    try {
        const { data } = await posts();

        dispatch({ type: GET_POSTS, data: data.reverse() });
    } catch (error: any) {
        return dispatch({ type: GET_POSTS, error: error.response.data.message });
    }
}

export const getUserPosts = (id: any) => async (dispatch: any) => {
    try {
        const { data } = await userPosts(id);

        dispatch({ type: GET_USERS_POSTS, data: data.reverse() });
    } catch (error: any) {
        return dispatch({ type: GET_USERS_POSTS, error: error.response.data.message });
    }
}