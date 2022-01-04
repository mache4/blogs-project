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

                if (oldUser) return res.status(400).json({ message: "User already exists" });

                const hashedPassword = await bcrypt.hash(password, 12);

                const result = await User.create({ email, password: hashedPassword });

                const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "2h" });

                res.status(201).json({ result, token });
            } catch (error) {
                res.status(500).json({ message: "Something went wrong" });

                console.log(error);
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}