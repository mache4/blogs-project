import { AUTH } from '../../constants/actionTypes';
import axios from "axios";

const API = axios.create({ baseURL: '/api/user' });

API.interceptors.request.use((req: any) => {
    if (localStorage.getItem('profile'))
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') || '{}').token}`;
    return req;
});

const signIn = (formData: any) => API.post('/signin', formData);
const signUp = (formData: any) => API.post('/signup', formData);

export const signin = (formData: any, router: any) => async (dispatch: any) => {
    try {
        // ovde loading: true
        const { data } = await signIn(formData);

        dispatch({ type: AUTH, data }); // dodati loading: false
    } catch (error: any) {
        return dispatch({ type: AUTH, error: error.response.data.message });
    }
    router.push('/');
}

export const signup = (formData: any, router: any) => async (dispatch: any) => {
    try {
        const { data } = await signUp(formData);

        dispatch({ type: AUTH, data });
    } catch (error: any) {
        return dispatch({ type: AUTH, error: error.response.data.message });
    }
    router.push('/');
}