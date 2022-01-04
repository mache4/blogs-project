import dbConnect from "../../../lib/mongodb";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secret = "p9gbkds8w37yha2psad";

export default async function handler(req: any, res: any) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            const { email, password } = req.body;

            try {
                const oldUser = await User.findOne({ email });

                if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

                const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

                if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

                const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "2h" });

                res.status(200).json({ result: oldUser, token });
            } catch (err) {
                res.status(500).json({ message: "Something went wrong" });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}