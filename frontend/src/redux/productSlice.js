import { createSlice } from "@reduxjs/toolkit";


const productSlilce = createSlice({
    name:'product',
    initialState:{
        products:[]
    },
    reducers:{
        setProducts:(state, action)=>{
            state.products= action.payload
        }
    }
})

export const {setProducts}= productSlilce.actions
export default productSlilce.reducer