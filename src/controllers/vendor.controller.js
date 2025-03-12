import { asyncHandler } from "../utils/asyncHandler.js";
import { Vendor } from "../models/vendor.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
const vendorProfile = asyncHandler(
    async (req,res)=>{
        console.log('i am vendor');
        
    }
)
const vendorProfileAllProducts = asyncHandler(
    async (req,res)=>{
        const user = req.user;
        const vendor = await Vendor.findOne({user : user._id});
        if(vendor){
            const products = await Product.find({vendor : vendor._id});
            res.status(200).json(products);
        }
        
    }
)
const vendorProfileAddProduct = asyncHandler(
    async (req,res)=>{
        const user = req.user;
        const vendor = await Vendor.findOne({user : user._id});
        
        const {name,banner_img,sku,description,category,stock_quantity} = req.body;
        const product = await Product.create({
            name,
            banner_img,
            sku,
            description,
            category,
            stock_quantity,
            vendor : vendor._id
        });
      
        
        return res.status(201).json(
            new ApiResponse(201,product,"Product Added Successfully")
        )
    }
)
const vendorProfileAllOrders = asyncHandler(
    async (req,res)=>{
        console.log('i am vendor');
        
    }
)

export {vendorProfile,vendorProfileAllProducts,vendorProfileAllOrders,vendorProfileAddProduct}