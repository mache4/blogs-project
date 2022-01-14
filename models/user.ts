import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: {
        type: String,
        min: 4,
        max: 16
    },
    password: {
        type: String,
        min: 8
    },
    profilePicture: {
        type: String,
        default: "default-picture.jpg"
    },
    createdAt: Date
});

const User = mongoose.models.Users || mongoose.model('Users', userSchema);

export default User;

export { userSchema };