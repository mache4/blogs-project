import { FETCH_ALL, CREATE_POST } from "../../constants/actionTypes";

export default function authReducer(state = { authData: null }, action: any) {
    switch (action.type) {
        case FETCH_ALL:
            return { ...state, postsData: action.data, error: action.error };
        // case CREATE_POST:
        //     localStorage.clear();
        //     return { ...state, authData: null, loading: false, error: null };
        default:
            return state;
    }
};