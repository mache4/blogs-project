import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.models.Users || mongoose.model('Users', userSchema);

export default User;