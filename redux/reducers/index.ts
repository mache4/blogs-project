import { combineReducers } from "redux";
import authReducer from "./auth";
import postsReducer from "./posts";
import userPostsReducer from "./userPosts";

const reducer = combineReducers({ authReducer, postsReducer, userPostsReducer });

export default reducer;