import express from "express";
const router = express.Router();
import { fetchAllCategory, fetchAllProducts,fetchSingleCategory,fetchSingleProduct } from "../controllers/home.controller.js";

router.route("/products").get(fetchAllProducts);
router.route("/product/:id").get(fetchSingleProduct);
router.route("/categories").get(fetchAllCategory);
router.route("/category/:id").get(fetchSingleCategory);
export default router;