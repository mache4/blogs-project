import { GET_POSTS, CREATE_POST } from "../../constants/actionTypes";
import axios from "axios";

const API = axios.create({ baseURL: "/api" });

API.interceptors.request.use((req: any) => {
    if (localStorage.getItem("profile"))
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile") || "{}").token}`;
    return req;
});

const posts = () => API.get("/posts");
const post = (formData: any) => API.post("/post", formData);

export const createPost = (formData: any) => async (dispatch: any) => {
    try {
        const { data } = await post(formData);
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