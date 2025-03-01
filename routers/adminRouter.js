const authMiddleware = require("../middleware/auth");
const express = require('express');
const router = express.Router();



const {
    registerAdmin,
    loginAdmin
}=require('../controller/authController');


router.post('/register-admin', registerAdmin);
router.post('/login-admin', loginAdmin);

module.exports = router;