import express from "express";
const router = express.Router()
import { userRegister, userLogin,userProfile } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import checkVendor from "../middlewares/vendor.middleware.js";
import { vendorProfile ,vendorProfileAllProducts,vendorProfileAddProduct,vendorProfileAllOrders} from "../controllers/vendor.controller.js";


router.route("/register").post(userRegister)
router.route("/login").post(userLogin)
router.route("/profile").get(verifyJwt,userProfile)
router.route("/profile/vendor").get(verifyJwt,checkVendor,vendorProfile)
router.route("/profile/vendor/all/products").get(verifyJwt,checkVendor,vendorProfileAllProducts)
router.route("/profile/vendor/add/product").post(verifyJwt,checkVendor,vendorProfileAddProduct)
router.route("/profile/vendor/all/orders").get(verifyJwt,checkVendor,vendorProfileAllOrders)

export default router