import cloudinary from "../../../../utils/cloudinary.js";
import getDataUri from "../../../../utils/dataUri.js";
import { Product } from "../model/productModel.js";

export const addProduct = async(req, res)=>{
   
    try{
         console.log("BODY =>", req.body);
            console.log("FILES =>", req.files);
        const {productName, productDesc, productPrice, category, brand} = req.body;
        const userId = req.id;

        if(!productName || !productDesc || !productPrice || !category || !brand){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        //c
        if (!req.files || req.files.length === 0) {
        return res.status(400).json({
            success: false,
            message: "At least one image is required"
        });
        }
    //c
        //Handle multiple image uploads
        let productImg = [];
        if(req.files && req.files.length > 0){
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
            productImg,
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

export const getAllProduct = async(_, res)=>{
    try{
        const products = await Product.find()
        if (!products ){
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

export const deleteProduct = async(req, res)=>{
    try{
        const {productId}= req.params;

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({
                screen:false,
                message:"product not found"
            })
        }
        // Delete images from cloudinary
        if(product.productImg && product.productImg.length > 0){
            for (let img of product.productImg){
                const result = await cloudinary.uploader.destroy(img.public_id);
            }
        }
        //Delete product from MongoDB
        await Product.findByIdAndDelete(productId);
        return res.status(200).json({
            success:true,
            message:"product deleted successfully"
        })
    }catch(error){
        return res.status(500).json({
            screen:false,
            message:error.message
        })
    }
}

export const updateProduct  = async(req, res)=>{
    try{
        const {productId}= req.params;
        const {productName, productDesc, productPrice, category, brand, existingImages} = req.body;

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        let updateImages = []

        // keep selected old images
        if(existingImages){
            const keepId = JSON.parse(existingImages);
            updateImages = product.productImg.filter ((img)=>
                keepId.includes(img.public_id)
            );
            for (let img of removedImages){
                await cloudinary.uploader.destroy(img.public_id)
            }
        }else{
            updateImages = product.productImg
        }

        //upload new images if any
        if(req.files && req.files.length > 0){
            for (let file of req.files){
                const fileUri = getDataUri(file)
                const result = await cloudinary.uploader.upload(fileUri, {folder:"mern_products"})
                updateImages.push({
                    url:result.success_url,
                    public_id:result.public_id
                })
                
            }
        }

        //update product 
        product.productName = productName || product.productName;
        product.productDesc = productDesc || product.productDesc;
        product.productPrice = productPrice || product.productPrice;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.productImg = updateImages 
        
        await product.save()

        return res.status(200).json({
            success:true,
            message:"product updated successfully"
            
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
