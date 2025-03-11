import express from "express";
const router = express.Router()
import { userRegister, userLogin } from "../controllers/user.controller.js";


router.route("/register").post(userRegister)
router.route("/login").post(userLogin)
export default router