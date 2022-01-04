import { AUTH, LOGOUT, REMOVE_ERRORS } from "../../constants/actionTypes";

export default function authReducer(state = { authData: null }, action: any) {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action.data, loading: false, error: action.error };
        case LOGOUT:
            localStorage.clear();

            return { ...state, authData: null, loading: false, error: null };
        case REMOVE_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};