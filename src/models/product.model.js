import mongoose from "mongoose";

const variationSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    sku:{
        type : String,
        required : true
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    banner_img : {
        type : String,
        required : true
    },
    attributes : {
        type : Map,
        of: mongoose.Schema.Types.Mixed,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    discount_price : {
        type : Number,
        required : true
    },
    stock_quantity : {
        type : Number,
        required : true
    }
   
},{timestamps : true})
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    vendor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Vendor",
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },
   
    is_active : {
        type : Boolean,
        default : false
    },
    variation : [{
        type : variationSchema,
        required : true
    }]
},{timestamps : true})
    productSchema.index({ category: 1, vendor: 1 });
    variationSchema.index({ sku: 1 }, { unique: true });
export const Product = mongoose.model("Product", productSchema);
export const Variation = mongoose.model("Variation", variationSchema);