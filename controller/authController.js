const { z } = require("zod");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/model").user;
require("dotenv").config();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(10).max(11),
  address: z.string().regex(/^[a-zA-Z0-9\s,'-]*$/),
  birthday: z.date(),
});

const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({  req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const validatedData = registerSchema.parse(req.body);
    if (!validatedData) {
      return res.status(400).json({ message: "Invalid data" });
    }
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const phoneNumber = await User.findOne(req.body.phone);
    if(phoneNumber){
      return res.status(400).json({ message: "Phone number already exists" });
    }
    const date = new Date(req.body.birthday);
    if(Date.now().getYear() - date.getYear() <18){
      return res.status(400).json({ message: "Require 18 years old" });
    }
    const user = new User({
        email,
        password:hashedPassword,
        phone,
        address,
        birthday
    })
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {}
