import express from "express";
const router = express.Router()
import { userRegister, userLogin,userProfile } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import checkVendor from "../middlewares/vendor.middleware.js";
import { vendorProfile } from "../controllers/vendor.controller.js";


router.route("/register").post(userRegister)
router.route("/login").post(userLogin)
router.route("/profile").get(verifyJwt,userProfile)
router.route("/profile/vendor").get(verifyJwt,checkVendor,vendorProfile)

export default router