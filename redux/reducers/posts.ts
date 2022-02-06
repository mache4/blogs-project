import { GET_POSTS } from "../../constants/actionTypes";

export default function postsReducer(state = {}, action: any) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, postsData: action.data, error: action.error };
        // case CREATE_POST:
        //     console.log("payload", action.payload)
        //     return { ...state, postsData: { ...action.payload } };
        default:
            return state;
    }
};