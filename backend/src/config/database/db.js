import mongoose from "mongoose";
import { MONGO_URI } from "./envConfig";

const connectDB = async()=>{
    try {
        await mongoose.connect(`${MONGO_URI}Eshap`);
        console.log("MongoDB connected successfully");
        
    }catch(error){
       console.log("mongoDB connection failed:", error) 
    }
}


export default connectDB;