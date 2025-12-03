import mongoose from "mongoose";


let isConnected = false;

export const connectDB = async() => {
    if(isConnected) return;

    const URI = process.env.MONGODB_URI;

    if(!URI) throw new Error("Mongo_URI is not defined in env file");

    try {
        const db = await mongoose.connect(URI);
        isConnected = db.connections[0].readyState === 1;
        // readystate = 0 means disconnected, 1 = conneccted, 2 - connecting, 3- disconnecting
        console.log("MongoDB connected");
    } catch (error) { 
        console.log("Error connecting to database : ", error);
    }
}