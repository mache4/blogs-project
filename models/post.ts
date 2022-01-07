import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        email: String
    },
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.models.Posts || mongoose.model('Posts', postSchema);

export default Post;