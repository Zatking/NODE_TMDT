const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

const{
    createProduct,
    getProducts,
    CreateCategories,
    getCategories,
    CreateBrand,
    getBrands,
    CreateState,
    getStates,
    deleteState,
    findStatebyID,
    createProductWithImageLink,
    findProductByName,
    findProductByPrice,
    addProductToCart,
    updateCartItem
    
}=require('../controller/productController');
const authMiddleware = require('../middleware/auth');

router.post('/create-product', upload.array("Images",5),createProduct);
router.get('/get-product', getProducts);
router.post('/create-category', CreateCategories);
router.get('/get-category', getCategories);
router.post('/create-brand', CreateBrand);
router.get('/get-brand', getBrands);
router.post('/create-state', CreateState);
router.get('/get-state', getStates);
router.delete('/delete-state', deleteState);
router.get('/findsatebyid', findStatebyID);
router.post('/createProduct',createProductWithImageLink);
router.get('/findProductByName', findProductByName);
router.get('/findProductByPrice', findProductByPrice);
router.post('/addProductToCart',authMiddleware, addProductToCart);
router.put('/updateCartItem',authMiddleware, updateCartItem);


module.exports = router;