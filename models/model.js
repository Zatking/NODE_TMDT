const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const CategoriesSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  CateName: { type: String, required: true },
});

const BrandSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  BrandName: { type: String, required: true },
})

const StateSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  StateName: { type: String, required: true },
})

const CartSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  ProID: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Price: { type: Number, required: true },
  Total: { type: Number, required: true },
})

const ProductSchema = new mongoose.Schema({
  _id:{type: String, required: true},
  ProName: { type: String, required: true },
  Price: { type: Number, required: true },
  RemainQuantity: { type: Number, required: true },
  SoldQuantity: { type: Number, default: 0 },
  Description: { type: String, required: true },
  Image: { type: String, required: true },
  Category: { type: CategoriesSchema, ref: 'Categories' },
  Brand: { type: BrandSchema, ref: 'Brand' },
  State: { type: StateSchema, ref: 'State' },
})

//Models
const product = mongoose.model('Product', ProductSchema);
const categories = mongoose.model('Categories', CategoriesSchema);
const brand = mongoose.model('Brand', BrandSchema);
const state = mongoose.model('State', StateSchema);




module.exports = {

  product,
  categories,
  brand,
  state,
}


