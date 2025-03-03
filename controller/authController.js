const { z } = require("zod");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/model").user;
const Admin = require("../models/model").admin;
require("dotenv").config();

const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // const validatedData = registerSchema.parse(req.body);
    // if (!validatedData) {
    //   return res.status(400).json({ message: "Invalid data" });
    // }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const phoneNumber = await User.findOne({ phone: req.body.phone });
    if (req.body.username.length < 6 || req.body.password.length > 30) {
      return res.status(400).json({
        message: "Username must be greater than 6 and less than 30 characters",
      });
    }
    if (phoneNumber) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
    // nếu như tuổi dưới 18 thì không được đăng ký
    const birthday = new Date(req.body.birthday);
    const age = new Date().getFullYear() - birthday.getFullYear();
    if (age < 18) {
      return res.status(400).json({ message: "Age must be greater than 18" });
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      birthday: req.body.birthday,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    });
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: "Có lỗi xảy ra", err: err.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const existingAccount = await Admin.findOne({ email: req.body.email });
    if (existingAccount) {
      return res.status(400).json({ message: "Account already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (req.body.username.length < 6 || req.body.password.length > 30) {
      return res.status(400).json({
        message: "Username must be greater than 6 and less than 30 characters",
      });
    }
    if (req.body.password.length < 6 || req.body.password.length > 30) {
      return res.status(400).json({
        message: "Password must be greater than 6 and less than 30 characters",
      });
    }
    const admin = new Admin({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    await admin.save();
    return res.status(200).json({ message: "Account created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Có lỗi xảy ra", err: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRE,
    });
    return res.json({ access_token: token, token_type: "Bearer", user: user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    const user = await User.findOne({ email });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(400).json({ message: "Mật khẩu không đúng" });
      const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE,
      });
      res.json({ access_token: token, token_type: "Bearer", role: "admin" });
    } else if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Mật khẩu không đúng" });

      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE,
      });
      res.json({ access_token: token, token_type: "Bearer", role: "user" });
    } else {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra", err: err.message });
  }
};

const ReadToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  const decoded = jwt.decode(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.json(decoded);
};

module.exports = { register, login, registerAdmin, loginAdmin, ReadToken };
