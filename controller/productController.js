const { z } = require("zod");
const Product = require("../models/model").product;
const State = require("../models/model").state;
const Brands = require("../models/model").brand;
const Categories = require("../models/model").categories;
const mongoose = require("mongoose");



const BrandSchema = z.object({
  BrandName: z.string().min(1, "Tên thương hiệu phải có ít nhất 3 ký tự"),
});



const CreateBrand = async (req, res) => {
  const existingBrand = await Brands.findOne({ BrandName: req.body.BrandName });
  if (existingBrand) {
    return res.status(400).json({ error: "Thương hiệu đã tồn tại" });
  }
  try {
    const validatedData = BrandSchema.safeParse(req.body);
    if (!validatedData.success) {
      console.log(
        "Lỗi dữ liệu vì vi phạm các quy tắc sau: ", 
        validatedData.error.errors
      );
      return res.status(400).json({ error: validatedData.error.errors });
    }

    const { BrandName } = req.body;
    const newBrand = new Brands({
      BrandName,
    });
    await newBrand.save();
    res
      .status(201)
      .json({ message: "Thêm thương hiệu thành công", brand: newBrand });
  } catch (error) {
    console.log("Lỗi khi thêm thương hiệu: ", error);
    res.status(500).json({ error: "Lỗi khi thêm thương hiệu" });
  }
};

const getBrands = async (req, res) => {
  try {
    const brands = await Brands.find();
    res.status(200).json({ brands });
  } catch (error) {
    console.log("Lỗi khi lấy thương hiệu: ", error);
    res.status(500).json({ error: "Lỗi khi lấy thương hiệu" });
  }
};

const StateSchema = z.object({
  StateName: z.string().min(1, "Tên trạng thái phải có ít nhất 3 ký tự"),
})

const CreateState = async (req, res) => {
  const existingState = await State.findOne({ StateName: req.body.StateName });
  if (existingState) {
    return res.status(400).json({ error: "Trạng thái đã tồn tại" });
  }
  try{
    const validatedData = StateSchema.safeParse(req.body);
    if (!validatedData.success) {
      console.log(
        "Lỗi dữ liệu vì vi phạm các quy tắc sau: ",
        validatedData.error.errors
      );
      return res.status(400).json({ error: validatedData.error.errors });
    }
    const { StateName } = req.body;
    const newState = new State({
      StateName,
    });
    await newState.save();
    res
      .status(201)
      .json({ message: "Thêm trạng thái thành công", state: newState });
  } catch (error) {
    console.log("Lỗi khi thêm trạng thái: ", error);
    res.status(500).json({ error: "Lỗi khi thêm trạng thái" });
  }
}

const getStates = async (req, res) => {
  try{
    const states = await State.find();
    res.status(200).json({ states });
  }catch (error){
    console.log("Lỗi khi lấy trạng thái: ", error);
    res.status(500).json({ error: "Lỗi khi lấy trạng thái" });
  }
}

const CategoriesSchema = z.object({
  CateName: z.string().min(1, "Tên danh mục phải có ít nhất 3 ký tự"),
});

const CreateCategories = async (req, res) => {
  const existingCate = await Categories.findOne({
    CategoryName: req.body.CateName,
  });
  if (existingCate) {
    return res.status(400).json({ error: "Danh mục đã tồn tại" });
  }
  try {
    const validatedData = CategoriesSchema.safeParse(req.body);
    if (!validatedData.success) {
      console.log(
        "Lỗi dữ liệu vì vi phạm các quy tắc sau: ",
        validatedData.error.errors
      );
      return res.status(400).json({ error: validatedData.error.errors });
    }
    await Categories.create(req.body);
    res
      .status(201)
      .json({ message: "Thêm danh mục thành công", category: req.body });
  } catch {
    console.log("Lỗi khi thêm danh mục: ", error);
    res.status(500).json({ error: "Lỗi khi thêm danh mục" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.log("Lỗi khi lấy danh mục: ", error);
    res.status(500).json({ error: "Lỗi khi lấy danh mục" });
  }
};

const ProductSchema = z.object({
  ProductName: z.string().min(1, "Tên sản phẩm phải có ít nhất 1 ký tự"),
  Price:z.number().nonnegative("Giá sản phẩm phải lớn hơn hoặc bằng 0"),
  RemainQuantity: z.number().nonnegative("Số lượng sản phẩm phải lớn hơn hoặc bằng 0"),
  Description: z.string().min(1, "Mô tả sản phẩm phải có ít nhất 1 ký tự"),
  Category: z.string(),
  Brand: z.string(),
  State: z.string(),
})


// const ProductSchema = z.object({
//   ProName: z.string().min(1, "Tên sản phẩm phải có ít nhất 1 ký tự"),
//   Price:z.string(),
//   RemainQuantity: z. string(),
//   Description: z.string().min(1, "Mô tả sản phẩm phải có ít nhất 1 ký tự"),
//   Category: z.string(),
//   Brand: z.string(),
//   State: z.string(),
// })
const createProduct = async (req, res) => {
  try {
    // Kiểm tra nếu sản phẩm đã tồn tại
    const existingProduct = await Product.findOne({ ProName: req.body.ProName });
    if (existingProduct) {
      return res.status(400).json({ error: "Sản phẩm đã tồn tại" });
    }

    // Kiểm tra ObjectId hợp lệ trước khi truy vấn
    if (!mongoose.Types.ObjectId.isValid(req.body.State)) {
      return res.status(400).json({ error: "ID State không hợp lệ" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.Brand)) {
      return res.status(400).json({ error: "ID Brand không hợp lệ" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.Category)) {
      return res.status(400).json({ error: "ID Category không hợp lệ" });
    }

    // Kiểm tra nếu trạng thái, thương hiệu, danh mục có tồn tại
    const state = await State.findById(req.body.State);
    const brand = await Brands.findById(req.body.Brand);
    const category = await Categories.findById(req.body.Category);

    if (!state) {
      return res.status(404).json({ error: "Trạng thái không tồn tại" });
    }
    if (!brand) {
      return res.status(404).json({ error: "Thương hiệu không tồn tại" });
    }
    if (!category) {
      return res.status(404).json({ error: "Danh mục không tồn tại" });
    }

    // Kiểm tra dữ liệu đầu vào với Zod
    const validatedData = ProductSchema.safeParse(req.body);
    if (!validatedData.success) {
      console.log("Lỗi dữ liệu:", validatedData.error.errors);
      return res.status(400).json({ error: validatedData.error.errors });
    }

    // Destructuring dữ liệu từ request body
    const { ProName, Price, RemainQuantity, Description } = req.body;

    // Kiểm tra xem có file ảnh không
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Vui lòng tải lên ảnh" });
    }

    // Lấy danh sách URL ảnh từ Cloudinary
    const imageUrls = req.files.map((file) => file.path);

    // Tạo sản phẩm mới
    const newProduct = new Product({
      ProName,
      Price,
      RemainQuantity,
      Description,
      Images: imageUrls,
      Category: category._id,
      Brand: brand._id,
      State: state._id,
    });

    // Lưu sản phẩm vào database
    await newProduct.save();

    res.status(201).json({ message: "Thêm sản phẩm thành công", product: newProduct });
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error.message);
    res.status(500).json({ error: "Lỗi khi thêm sản phẩm", message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("Category")
      .populate("Brand")
      .populate("State");
    res.status(200).json({ products });
  } catch (error) {
    console.log("Lỗi khi lấy sản phẩm: ", error);
    res.status(500).json({ error: "Lỗi khi lấy sản phẩm" });
  }
};

const updateSchema =z.object({
  ProName: z.string().min(1, "Tên sản phẩm phải có ít nhất 3 ký tự"),
  Price: z.string(),
  RemainQuantity: z.string(),
  SoldQuantity: z.number().default(0),
  Description: z.string().min(10, "Mô tả sản phẩm phải có ít nhất 10 ký tự"),
  Category: z.string(),
})

const updateProduct = async (req, res) => {
  res.send("Update product");
}

const deleteState = async (req, res) => {
    try {
        const state = await State.findById(req.params.id);
        if (!state) {
            return res.status(404).json({ error: "Trạng thái không tồn tại" });
        }
        await state.delete();
        res.status(200).json({ message: "Xóa trạng thái thành công" });
    }
    catch (error) {
        console.log("Lỗi khi xóa trạng thái: ", error);
        res.status(500).json({ error: "Lỗi khi xóa trạng thái" });
    }
};



const findStatebyID = async(req,res)=> {
  try {
    const state = await State.findById(req.body._id);
    if (!state) {
      return res.status(404).json({ error: "Trạng thái không tồn tại" });
    }
    res.status(200).json({ state });
  }catch (error) {
    console.log("Lỗi khi tìm trạng thái: ", error);
    res.status(500).json({ error: "Lỗi khi tìm trạng thái" });
}
}

const createProductWithImageLink = async (req, res) => {
  try {
    // Kiểm tra nếu sản phẩm đã tồn tại
    const existingProduct = await Product.findOne({ ProName: req.body.ProName });
    if (existingProduct) {
      return res.status(400).json({ error: "Sản phẩm đã tồn tại" });
    }

    // Kiểm tra ObjectId hợp lệ trước khi truy vấn
    if (!mongoose.Types.ObjectId.isValid(req.body.State)) {
      return res.status(400).json({ error: "ID State không hợp lệ" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.Brand)) {
      return res.status(400).json({ error: "ID Brand không hợp lệ" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.Category)) {
      return res.status(400).json({ error: "ID Category không hợp lệ" });
    }

    // Kiểm tra nếu trạng thái, thương hiệu, danh mục có tồn tại
    const state = await State.findById(req.body.State);
    const brand = await Brands.findById(req.body.Brand);
    const category = await Categories.findById(req.body.Category);
    console.log("state",state);


    if (!state) {
      return res.status(404).json({ error: "Trạng thái không tồn tại" ,state});
    }
    if (!brand) {
      return res.status(404).json({ error: "Thương hiệu không tồn tại" });
    }
    if (!category) {
      return res.status(404).json({ error: "Danh mục không tồn tại" });
    }

    // Kiểm tra dữ liệu đầu vào với Zod
    const validatedData = ProductSchema.safeParse(req.body);
    if (!validatedData.success) {
      console.log("Lỗi dữ liệu:", validatedData.error.errors);
      return res.status(400).json({ error: validatedData.error.errors });
    }

    // Destructuring dữ liệu từ request body
    const { ProName, Price, RemainQuantity,Images, Description } = req.body;

    if(req.body.Images.length === 0){
      return res.status(400).json({ error: "Vui lòng tải lên ảnh" });
    }

    // Tạo sản phẩm mới
    const newProduct = new Product({
      ProName,
      Price,
      RemainQuantity,
      Description,
      Images,
      Category: category._id,
      Brand: brand._id,
      State: state._id,
    });

    // Lưu sản phẩm vào database
    await newProduct.save();

    res.status(201).json({ message: "Thêm sản phẩm thành công", product: newProduct });
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error.message);
    res.status(500).json({ error: "Lỗi khi thêm sản phẩm", message: error.message });
  }
};
    

    




const deleteAllState = async (req, res) => {
    try {
        await States.deleteMany();
        res.status(200).json({ message: "Xóa tất cả trạng thái thành công" });
    }
    catch (error) {
        console.log("Lỗi khi xóa tất cả trạng thái: ", error);
        res.status(500).json({ error: "Lỗi khi xóa tất cả trạng thái" });
    }
};



module.exports = {
  createProduct,
  getProducts,
  CreateCategories,
  getCategories,
  CreateBrand,
  getBrands,
  CreateState,
  getStates,
  deleteState,
  deleteAllState,
  findStatebyID,
  createProductWithImageLink
};
