import dbConnect from "../../../lib/mongodb";
import Post from "../../../models/post";

export default async function handler(req: any, res: any) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const posts = await Post.find();
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