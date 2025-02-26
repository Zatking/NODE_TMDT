const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/model").user;
require("dotenv").config();

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log("User dã tồn tại không thể đăng ký được nữa");
      res
        .status(400)
        .json({ message: "User đã tồn tại không thể đăng ký được nữa" });
    }const hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    console.log(err);
  }
};
