import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectDB from './src/config/database/db.js'
import productRoute from './src/module/product/routes/productRoute.js'
import userRoute from './src/module/user/routes/userRoute.js'
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)

//http://localhost:8000/api/v1/user/register
app.listen(PORT, ()=>{
    connectDB();
    console.log(`server is ranning port:${PORT}`);
})

