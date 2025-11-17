import { createSlice } from "@reduxjs/toolkit";


const productSlilce = createSlice({
    name:'product',
    initialState:{
        products:[],
        cart:[],
    },
    reducers:{
        setProducts:(state, action)=>{
            state.products= action.payload
        },
        setCart:(state, action)=>{
            state.cart = action.payload
        }
    }
})

export const {setProducts, setCart}= productSlilce.actions
export default productSlilce.reducer