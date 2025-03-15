import express from "express";
const router = express.Router()
import { userRegister, userLogin,userProfile,userProfileEdit,userPasswordChange,refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import checkVendor from "../middlewares/vendor.middleware.js";
import { vendorProfile ,vendorProfileAllProducts,vendorProfileAddProduct,vendorProfileAllOrders} from "../controllers/vendor.controller.js";
import { userOrder } from "../controllers/order.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)

// secured routes 
router.route("/profile").get(verifyJwt,userProfile)
router.route("/order").post(verifyJwt,userOrder)
router.route("/profile/edit/").post(verifyJwt,userProfileEdit)
router.route("/profile/edit/password").post(verifyJwt,userPasswordChange)
router.route("/refresh-token").post(refreshAccessToken)

// vendor routes 
router.route("/profile/vendor").get(verifyJwt,checkVendor,vendorProfile)
router.route("/profile/vendor/all/products").get(verifyJwt,checkVendor,vendorProfileAllProducts)
router.route("/profile/vendor/add/product").post(verifyJwt,checkVendor,upload.single("banner_img"), vendorProfileAddProduct)
router.route("/profile/vendor/all/orders").get(verifyJwt,checkVendor,vendorProfileAllOrders)

export default router