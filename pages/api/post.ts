import dbConnect from "../../lib/mongodb";
import Post from "../../models/post";

export default async function handler(req: any, res: any) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            const { author, title, content, createdAt } = req.body;

            try {
                const result = await Post.create({ author, title, content, createdAt });
                res.status(201).json({ result });
            } catch (error) {
                res.status(404).json({ message: "Something went wrong" });
                console.log(error);
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}