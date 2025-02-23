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
    createProductWithImageLink
}=require('../controller/productController');

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
router.post('/createProduct',createProductWithImageLink)

module.exports = router;