import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached)
    cached = global.mongoose = { conn: null, promise: null };

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}`)
            .then(mongoose => {
                console.log("MongoDB connected.");
                return mongoose;
            })
            .catch(err => {
                console.log(err);
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;