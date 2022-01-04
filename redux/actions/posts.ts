import { FETCH_ALL, CREATE_POST } from '../../constants/actionTypes';
import axios from "axios";

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((req: any) => {
    if (localStorage.getItem('profile'))
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') || '{}').token}`;
    return req;
});

const posts = () => API.get('/posts');

export const getPosts = () => async (dispatch: any) => {
    try {
        const { data } = await posts();

        dispatch({ type: FETCH_ALL, data });
    } catch (error: any) {
        return dispatch({ type: FETCH_ALL, error: error.response.data.message });
    }
}