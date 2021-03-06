import dbConnect from "../../../lib/mongodb";
import User from "../../../models/user";

export default async function handler(req: any, res: any) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                // const posts = await getUsers();
                const posts = await User.find();
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

// export const getUsers = async () => {
//     const posts = await User.find();
//     return posts;
// }