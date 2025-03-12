import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import {ApiResponse} from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Category } from "../models/category.model.js";
const fetchAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({is_active : true});
  res.status(200).json(new ApiResponse(200,products,"Products fetched successfully"));
});
const fetchSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product){
    throw new ApiError(404,"Product not found");
  }
  res.status(200).json(new ApiResponse(200,product,"Product fetched successfully"));
});
const fetchAllCategory = asyncHandler(async (req, res) => {
    
  const categories = await Category.find({status : 'ACTIVE'});
  res.status(200).json(new ApiResponse(200,categories,"categories fetched successfully"));
});
const fetchSingleCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if(!category){
    throw new ApiError(404,"category not found");
  }
  res.status(200).json(new ApiResponse(200,category,"Product fetched successfully"));
});

export { fetchAllProducts,fetchSingleProduct ,fetchAllCategory,fetchSingleCategory};