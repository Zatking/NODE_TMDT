const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  birthday: { type: Date, required: true },
});

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const CategoriesSchema = new mongoose.Schema({
  CateName: { type: String, required: true },
});

const BrandSchema = new mongoose.Schema({
  BrandName: { type: String, required: true },
});

const StateSchema = new mongoose.Schema({
  StateName: { type: String, required: true },
});

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const OrderSchema = new mongoose.Schema({
  items: [
    {
      productIds: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantities: { type: Number, required: true, default: 1 },
    },
  ],
  customer: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    note: { type: String },
  },
  TotalPrice: { type: Number, required: true },
  status: { type: String, enum: ["pending", "canceled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new mongoose.Schema({
  ProName: { type: String, required: true },
  Price: { type: Number, required: true },
  RemainQuantity: { type: Number, required: true },
  SoldQuantity: { type: Number, default: 0 },
  Description: { type: String, required: true },
  Images: [{ type: String, required: true }],
  Rate: { type: Number, default: 10 },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  Brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  State: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
});

//Models
const product = mongoose.model("Product", ProductSchema);
const categories = mongoose.model("Categories", CategoriesSchema);
const brand = mongoose.model("Brand", BrandSchema);
const state = mongoose.model("State", StateSchema);
const user = mongoose.model("User", UserSchema);
const cart = mongoose.model("Cart", CartSchema);
const order = mongoose.model("Order", OrderSchema);
const admin = mongoose.model("Admin", AdminSchema);

module.exports = {
  product,
  categories,
  brand,
  state,
  user,
  cart,
  order,
  admin,
};
