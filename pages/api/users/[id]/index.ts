import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/user";

export default async function handler(req: any, res: any) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            const {
                query: { id }
            } = req;

            try {
                // const user = await getUserById(id);
                const user = await User.find({ _id: id });
                res.status(200).json(user);
            } catch (error) {
                res.status(404).json({ message: "Something went wrong." });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}

// export const getUserById = async (id: any) => {
//     const user = await User.find({ _id: id });
//     return user;
// }