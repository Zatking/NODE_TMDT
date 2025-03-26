const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
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
  updateCartItem,
  orderProduct,
  getCart,
  getAllOrders,
  getUserOrders,
  updateProduct,
  getProductsByCategoryID,
  deleteProduct,
  getOrderByID,
  deleteCateByID,
  deleteBrandByID,
  deleteStateByID,
} = require("../controller/productController");
const authMiddleware = require("../middleware/auth");

router.post("/create-product", upload.array("Images", 5), createProduct);
router.get("/get-product", getProducts);
router.put("/update-product/:id", updateProduct);
router.post("/create-category", CreateCategories);
router.get("/get-category", getCategories);
router.post("/create-brand", CreateBrand);
router.get("/get-brand", getBrands);
router.post("/create-state", CreateState);
router.get("/get-state", getStates);
router.delete("/delete-state", deleteState);
router.get("/findsatebyid", findStatebyID);
router.post("/createProduct", createProductWithImageLink);
router.get("/findProductByName", findProductByName);
router.get("/findProductByPrice", findProductByPrice);
router.post("/addProductToCart", authMiddleware, addProductToCart);
router.put("/updateCartItem", authMiddleware, updateCartItem);
router.post("/orderProduct", orderProduct);
router.get("/getCart", authMiddleware, getCart);
router.get("/getAllOrders", getAllOrders);
router.get("/getUserOrders", authMiddleware, getUserOrders);
router.get("/getProductsByCategory/:cate", getProductsByCategoryID);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/getOrderByID/:id", getOrderByID);
router.delete("/deleteCateByID/:id", deleteCateByID);
router.delete("/deleteBrandByID/:id", deleteBrandByID);
router.delete("/deleteStateByID/:id", deleteStateByID);
module.exports = router;
