import mongoose from "mongoose";


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
    banner_img : {
        type : String,
        required : true
    },
    sku:{
        type : String,
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
    stock_quantity : {
        type : Number,
        required : true
    },
    
},{timestamps : true})
    productSchema.index({ category: 1, vendor: 1 });

export const Product = mongoose.model("Product", productSchema);
