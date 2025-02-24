const mongoose = require('mongoose');



const CategoriesSchema = new mongoose.Schema({
  CateName: { type: String, required: true },
});

const BrandSchema = new mongoose.Schema({
  BrandName: { type: String, required: true },
})

const StateSchema = new mongoose.Schema({
  StateName: { type: String, required: true },
})

const CartSchema = new mongoose.Schema({

  ProID: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Price: { type: Number, required: true },
  Total: { type: Number, required: true },
})


const ProductSchema = new mongoose.Schema({
  ProName: { type: String, required: true },
  Price: { type:Number , required: true },
  RemainQuantity: { type: Number, required: true },
  SoldQuantity: { type: Number, default: 0 },
  Description: { type: String, required: true },
  Images: [{ type: String, required: true }],
  Rate: { type: Number,default: 10 },
  Category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
  Brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  State: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
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


