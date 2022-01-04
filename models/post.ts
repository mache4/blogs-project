import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: String,
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.models.Posts || mongoose.model('Posts', postSchema);

export default Post;