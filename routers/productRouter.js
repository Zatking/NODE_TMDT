const express = require('express');
const router = express.Router();


const{
    createProduct,
    getProducts,
    CreateCategories,
    getCategories,
    CreateBrand,
    getBrands,
    CreateState,
    getStates
}=require('../controller/productController');

router.post('/create', createProduct);
router.get('/get', getProducts);
router.post('/create-category', CreateCategories);
router.get('/get-category', getCategories);
router.post('/create-brand', CreateBrand);
router.get('/get-brand', getBrands);
router.post('/create-state', CreateState);
router.get('/get-state', getStates);

module.exports = router;