import { Product } from "../product/model/productModel";
import { Cart} from "./cartModel";

export const getCart = async(req, res)=>{
    try{
        const userId = req.id;

        const cart = await Cart.findOne({userId}).populate("items.productId");
        if(!cart){
            return res.json({success:true, cart:[]})
        }
        res.status(200).json({success:true, cart})
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    };
}

export const addToCart = async(req, res)=>{
    try{
        const userId = req.id;
        const {productId} = req.body;

        //check if product exists
        const product = await Product.findById(productId)
            if(!product){
                return res.status(404).json({
                    success:false,
                    message:"Product not found"
                })
            }
        //find the user's cart (if existe)
        let cart = await Cart.findOne({userId})

        //uf cart doesn't exists, create a new one
        if(!cart){
            cart = new Cart({
                userId,
                items:[{productId, quantity:1, price:product.productPrice}],
                totalPrice:product.productPrice
            })
        }else{
            const itemIndex = cart.items.findById(
                (item)=> item.productId.toString() === productId
            )
            if(itemIndex > -1){
                cart.item[itemIndex].quantity +=1
            }else{
                //if new product -> push to cart
                cart.items.push({
                    productId,
                    quantity:1,
                    price:product.productPrice,
                })
            }
            //recalculate total price
            cart.totalPrice = cart.items.reduce(
                (acc, item)=> acc + item.price*item.quantity
            )
        }
        //Save updated cart
        await cart.save()

        // Populate product details before sending response
        const populateCart = await Cart.findById(cart._id).populate("items.productId")
        res.status(200).json({
            success:true,
            message:"Product added to cart successfully",
            cart:populateCart
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}