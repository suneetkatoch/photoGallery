import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URL){
    throw new Error("MONGODB_URL is not defined");
}

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL); // Changed from MONGO_URI to MONGODB_URL
        console.log("database connected");
    }catch(err){
        console.log("mongoDB connection error", err);
        process.exit(1);
    }
}

export default connectDB;
