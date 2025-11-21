import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName:{type:String,requird:true},
    lastName:{type:String,requird:true},
    profilePic:{type:String,default:""},//Cloduinary image url
    profilePicPublicId:{type:String,default:""},//Cloudinary public_id for deletion
    Username:{type:String},//
    email:{type:String, require:true, unique:true},
    password:{type:String},
    googleId:{type:String},
    avatar:{type:String},
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    },
    token:{type:String, default:null},
    isVerified:{type:Boolean, default:false},
    isLoggedIn:{type:String, default:null},
    otp:{type:String, default:null},
    otpExpiry:{type:String, default:null},
    address:{type:String},
    city:{type:String},
    zipCode:{type:String},
    phoneNo:{type:String},
    
}, {timestamps:true})

export const User = mongoose.model("User", userSchema)