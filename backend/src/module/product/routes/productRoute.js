import express from 'express'
import { isAdmin, isAuthenticated } from '../../../middleware/isAuthenticated.js'
import { multipleUpload } from '../../../middleware/multer.js'
import { addProduct, getAllProduct } from '../controllers/productController.js'
 

const router = express.Router()
router.post('/add', isAuthenticated, isAdmin, multipleUpload, addProduct)
router.get('/getallproducts', getAllProduct)


export default router            