import cloudinary from "../../../../utils/cloudinary";
import getDataUri from "../../../../utils/dataUri";
import { Product } from "../model/productModel";

export const addProduct = async(req, res)=>{
    try{
        const {productName, productDasc, category, brand} = req.body;
        const userId = req.id;

        if(!productName || !productDasc || !category || !brand){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        //Handle multiple image uploads
        let productImg = []
        if(req.file && req.file.length > 0){
            for(let file of req.files){
                const fileUri = getDataUri(file)
                const result = await cloudinary.uploader.upload(fileUri,{
                    folder:"mern_products" //cloudinary folder name

                });
                productImg.push({
                    url:result.secure_url,
                    public_id:result.public_id
                })
            }
        }
        //create a product in DB
        const newProduct = await Product.create({
            userId,
            productName,
            productDesc,
            productPrice,
            category,
            brand,
            productImg
        })
        return res.status(200).json({
            success:true,
            message:"Product addedd successfully",
            product:newProduct
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getAllProduct = async(__dirname, res)=>{
    try{
        const products = await Product.find()
        if(!products){
            return res.status(404).json({
                success:false,
                message:"No product available",
                products:[]
            })
        }
        return res.status(200).json({
            success:true,
            products
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}