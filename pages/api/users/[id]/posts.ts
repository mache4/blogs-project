import dbConnect from "../../../../lib/mongodb";
import Post from "../../../../models/post";

export default async function handler(req: any, res: any) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            const {
                query: { id }
            } = req;

            try {
                const posts = await getUsersPosts(id);
                res.status(200).json(posts);
            } catch (error) {
                res.status(404).json({ message: "Something went wrong." });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}

export const getUsersPosts = async (id: any) => {
    const posts = await Post.find({ 'author._id': id });
    return posts;
}