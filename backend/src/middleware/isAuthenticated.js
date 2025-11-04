import  jwt  from "jsonwebtoken"
import { User } from "../module/user/model/userModel.js"



export const isAuthenticated = async (req, res, next)=>{
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(400).json({
                succes:false,
                message:"Authorization token is missing or invalid"
            })
        }
        const token = authHeader.split(" ")[1];
        let decoded;
        try{
            decoded = jwt.verify(token, process.env.SECRET_KEY)
        }catch(error){
            if(error.name === "TokenExpiredError"){
                return res.status(400).json({
                    succes:false,
                    message:"The registration token has expired"
                })
            }
            return res.status(400).json({
                succes:false,
                message:"access token is missing or ingalid"
            })
        }
        const user = await User.findById(decoded.id)
        if (!user){
            return res.status(400).json({
                succes:false,
                message:"User not found"
            })
        }
        req.id = user._id
        next();
    }catch (error){
        return res.status(500).json({
            succes:false,
            message:error.message
        })
    }
}

