import { GET_USERS_POSTS } from "../../constants/actionTypes";

export default function userPostsReducer(state = {}, action: any) {
    switch (action.type) {
        case GET_USERS_POSTS:
            return { ...state, postsData: action.data, error: action.error };
        default:
            return state;
    }
};