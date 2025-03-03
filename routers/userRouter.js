const authMiddleware = require("../middleware/auth");
const express = require('express');
const router = express.Router();

const{
    getInformation
}=require('../controller/userController');

const {
    register,
    login,
    ReadToken
}=require('../controller/authController');


router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getInformation);
router.get('/read-token', ReadToken);
module.exports = router;