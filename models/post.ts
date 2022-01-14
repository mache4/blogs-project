import mongoose from "mongoose";
import { userSchema } from "./user";

const postSchema = new mongoose.Schema({
    author: {
        type: userSchema
    },
    title: {
        type: String,
        min: 1,
        max: 70
    },
    content: {
        type: String,
        min: 1,
        max: 2500
    },
    createdAt: Date
});

const Post = mongoose.models.Posts || mongoose.model('Posts', postSchema);

export default Post;