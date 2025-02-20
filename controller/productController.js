const { z } = require("zod");
const Product = require("../models/model").Product;
const State = require("../models/model").State;
const Brand = require("../models/model").Brand;
const Categories = require("../models/model").Categories;


const StateSchema = z.object({
    StateName: z.string().min(3,"Tên trạng thái phải có ít nhất 3 ký tự"),
})

const CreateState = async (req, res) => {
    try {
        const validatedData = StateSchema.safeParse(req.body);
        if(!validatedData.success){
            console.log("Lỗi dữ liệu vì vi phạm các quy tắc sau: ", validatedData.error.errors);
            return res.status(400).json({error: validatedData.error.errors});
            
        }

        const { StateName } = req.body;
        const newState = new State({
            _id: newProductId.toString(),
            StateName
        });
        await newState.save();
        res.status(201).json({ message: "Thêm trạng thái thành công", state: newState });
    }catch(error){
        console.log("Lỗi khi thêm trạng thái: ", error);
        res.status(500).json({error: "Lỗi khi thêm trạng thái"});
    }

}

const getStates = async (req, res) => {
    try {
        const states = await State.find();
        res.status(200).json({states});
    }
    catch(error){
        console.log("Lỗi khi lấy trạng thái: ", error);
        res.status(500).json({error: "Lỗi khi lấy trạng thái"});
    }
}

const BrandSchema = z.object({
    BrandName: z.string().min(3,"Tên thương hiệu phải có ít nhất 3 ký tự"),
})

const CreateBrand = async (req, res) => {
    try{
        const validatedData = BrandSchema.safeParse(req.body);
        if(!validatedData.success){
            console.log("Lỗi dữ liệu vì vi phạm các quy tắc sau: ", validatedData.error.errors);
            return res.status(400).json({error: validatedData.error.errors});
            
        }

        const { BrandName } = req.body;
        const newBrand = new Brand({
            _id: newProductId.toString(),
            BrandName
        });
        await newBrand.save();
        res.status(201).json({ message: "Thêm thương hiệu thành công", brand: newBrand });
    }
    catch(error){
        console.log("Lỗi khi thêm thương hiệu: ", error);
        res.status(500).json({error: "Lỗi khi thêm thương hiệu"});
    }
}

const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json({brands});
    } catch(error) {
        console.log("Lỗi khi lấy thương hiệu: ", error);
        res.status(500).json({error: "Lỗi khi lấy thương hiệu"});
    }
}

const CategoriesSchema = z.object({
    CateName: z.string().min(3,"Tên danh mục phải có ít nhất 3 ký tự"),
})

const CreateCategories = async (req, res) => {
    try{
        const validatedData = CategoriesSchema.safeParse(req.body);
        if(!validatedData.success){
            console.log("Lỗi dữ liệu vì vi phạm các quy tắc sau: ", validatedData.error.errors);
            return res.status(400).json({error: validatedData.error.errors});
            
        }
        await Categories.create(req.body);
        res.status(201).json({ message: "Thêm danh mục thành công", category: req.body });

    }catch{
        console.log("Lỗi khi thêm danh mục: ", error);
        res.status(500).json({error: "Lỗi khi thêm danh mục"});
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json({categories});
    } catch(error) {
        console.log("Lỗi khi lấy danh mục: ", error);
        res.status(500).json({error: "Lỗi khi lấy danh mục"});
    }
}




const ProductSchema = z.object({
    ProName: z.string().min(3,"Tên sản phẩm phải có ít nhất 3 ký tự"),
    Price: z.number().nonnegative("Giá sản phẩm không phải số số âmâm "),
    RemainQuantity: z.number().nonnegative("Số lượng sản phẩm không phải số âm"),
    SoldQuantity: z.number().default(0),
    Description: z.string().min(10,"Mô tả sản phẩm phải có ít nhất 10 ký tự"),
    Image: z.string(),
    Category: z.string(),
    Brand: z.string(),
    State: z.string(),
})





const createProduct = async (req, res) => {
    try{
        const validatedData = ProductSchema.safeParse(req.body);
        if(!validatedData.success){
            console.log("Lỗi dữ liệu vì vi phạm các quy tắc sau: ", validatedData.error.errors);
            return res.status(400).json({error: validatedData.error.errors});
            
        }

        const {
            ProName,
            Price,
            RemainQuantity,
            Description,
            Category,
            Brand,
            State
        } = req.body;

        if(!req.file){
            return res.status(400).json({error: "Ảnh sản phẩm không được để trống"});
        }

    

        const product = new Product({
            ProName,
            Price,
            RemainQuantity,
            Description,
            Image: req.file.path,
            Category,
            Brand,
            State
        });
        await product.save();
        res.status(201).json({ message: "Thêm sản phẩm thành công", product: newProduct });
    } catch(error){
        console.log("Lỗi khi thêm sản phẩm: ", error);
        res.status(500).json({error: "Lỗi khi thêm sản phẩm"});
    }

  
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("Category").populate("Brand").populate("State");
        res.status(200).json({products});
    }
    catch(error){
        console.log("Lỗi khi lấy sản phẩm: ", error);
        res.status(500).json({error: "Lỗi khi lấy sản phẩm"});
    }
}


module.exports = {
    createProduct,
    getProducts,
    CreateCategories,
    getCategories,
    CreateBrand,
    getBrands,
    CreateState,
    getStates
}

