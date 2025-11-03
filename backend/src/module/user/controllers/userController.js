import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVarify/verifyEmail.js";
import { Session } from "../model/sessionModel.js";

export const register = async(req, res)=>{
    try {
        const {firstName, lastName, email,password}= req.body;
        if(!firstName || !lastName || !email || !password)
          return res.status(400).json({
                success:false,
                massage:'all fields are required'
        })
        
        const user = await User.findOne({email})
        if(user){
             return res.status(400).json({
                success:false,
                massage:'User already exists'
             })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword
        })


        const token = jwt.sign({id:newUser._id}, process.env.SECRET_KEY, {expiresIn:'2h'})
        verifyEmail(token, email)//send email here
        newUser.token = token
        await newUser.save()
        
        return res.status(201).json({
            success:true,
            message:'User registerd successfully',
            user:newUser
        })
    }catch(error){
        res.status(500).json({
        success:false,
        message:error.message
    })


    }
}




export const verify = async(req, res)=>{
    try{
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.Startswith("Bearer")){
           return res.status(400).json({
                success:false,
                message:'Authorization token is missing or invalid'
            })
        }
        const token = authHeader.split(" ")[1]
        let decoded
        try{
            decoded  = jwt.verify(token, process.env.SECRET_KEY)
        }catch(error){
            if (error.name === "TokenExpiredError"){
                return res.status(400).json({
                    success:false,
                    message:"The registration token has expired"
                })
            }
            return res.status(400).json({
                success:false,
                message:"Token verification faild"
            })
        }
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
          return res.status(200).json({     ///true
            success: true,
            message: "User verified successfully",
            user
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const reVerify = async(req, res)=>{
    try{
        const {email}= req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
            
        }
        const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn:'2h'})
        verifyEmail(token, email)//send email here
        user.token = token
        await user.save()
        return res.status(200).json({
            success:true,
            message:"Verifcation email successfull",
            token:user.token
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const login = async(req, res)=>{
    try {
        const {email, password}= req.body;
        if (!email || !password){
            return res.status(400).json({
                success:false,
                message:'all fields are required'
            })
        }
        const existstingUser = await User.findOne({email})
        if((!existstingUser)){
            return res.status(400).json({
                success:false,
                message:"User not exists"
            })
        }
        const isPasswordValid = await bcrypt.compare(password,existstingUser.password)
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid Creadentials"
            })
        }
        if(existstingUser.isVerified === false){
            return res.status(400).json({
                success:false,
                message:"Verify your accout than login"
            })
        }
        //generate token
        const accesToken = jwt.sign({id:existstingUser._id},process.env.SECRET_KEY,{expiresIn:'2d'})
        const refreshToken = jwt.sign({id:existstingUser._id},process.env.SECRET_KEY,{expiresIn:'2d'})

        existstingUser.isLoggedIn = true
        await existstingUser.save()


        const existingSession = await Session.findOne({userId:existstingUser._id})
        if(existingSession){
            await Session.deleteOne({userId:existstingUser._id})
        }

        await Session.create({userId:existstingUser._id})
        return res.status(200)({
            success:true,
            message:`welcome back ${existstingUser.firstName}`,
            user:existstingUser,
            accesToken,
            refreshToken
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// export const logout = async(req, res)=>{
//     try{
//         const userId =req.id
//     }catch(error){
//         return res.status(500)({
//             success:false,
//             message:error.message
//         })
//     }
// }