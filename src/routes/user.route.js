import express from "express";
const router = express.Router()
import { userRegister } from "../controllers/user.controller.js";


router.route("/register").post(userRegister)
export default router