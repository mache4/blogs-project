import { combineReducers } from "redux";
import authReducer from "./auth";
import postsReducer from "./posts";

const reducer = combineReducers({ authReducer, postsReducer });

export default reducer;