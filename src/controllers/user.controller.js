import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
const userRegister =asyncHandler(
    async (req,res)=>{
        const {first_name,last_name,email,password} = req.body
        if(first_name?.length === 0 || first_name === undefined){
                 throw new ApiError(400,'First name is required')  
        }
        if(last_name?.length === 0 || last_name === undefined){
            throw new ApiError(400,'Last name is required')  
        }
        if(email?.length === 0 || email === undefined){
            throw new ApiError(400,'Email is required')  
        }
        if(password?.length === 0 || password === undefined){
            throw new ApiError(400,'password is required')  
        }
    
        const existedUser = await User.findOne({email : email})
        if(existedUser){
            throw new ApiError(409, "User with email or username already exists", []);
        }
        const user = await User.create({
            email,
            password,
            first_name,
            last_name,
            username : email.split("@")[0],
            role : 'USER',
            avatar : 'Default.jpg'
        })
        return res.status(201).json(
            new ApiResponse(201,null,'User Registration Complete')
        )
        
    }
)  

export {userRegister}