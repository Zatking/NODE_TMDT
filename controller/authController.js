const { z } = require("zod");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/model").user;
require("dotenv").config();

const registerSchema = z.object({
    email:z.string().email(),
    password:z.string().min(8),
    phone:z.string().min(10).max(11),
    address:z.string().regex(/^[a-zA-Z0-9\s,'-]*$/),
    birthday:z.date(),
})

const register = async (req, res) => {
  const { email, password,phone,address,birthday } = req.body;


  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log("User dã tồn tại không thể đăng ký được nữa");
      res
        .status(400)
        .json({ message: "User đã tồn tại không thể đăng ký được nữa" });
    }
    const validatedData = registerSchema.parse(req.body);
    if(validatedData){
      console.log("Data đã được validate");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    console.log(err);
  }
};
