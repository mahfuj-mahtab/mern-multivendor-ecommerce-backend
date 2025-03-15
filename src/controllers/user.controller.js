import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const options = {
    httpOnly: true,
    secure: true
}
export const generateAccessRefreshToken = async (userId)=>{
   try {
     const user = await User.findOne({
         _id : userId
     })
     const accessToken = user.generateAccessToken()
     const refreshToken = user.generateRefreshToken()
     user.refreshToken = refreshToken
     user.save({ validateBeforeSave: false })
     return {accessToken,refreshToken}
   } catch (error) {
        throw new ApiError(500, 'Something went wrong')
   }

}
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

const userLogin = asyncHandler(
    async (req,res)=>{
        const {email,password} = req.body
        const userExist = await User.findOne({email : email});
        
        
        if(!userExist){
            throw new ApiError(400,'User Not Available')
        }
        const passwordCorrect = await userExist.isPasswordCorrect(password)
        if(!passwordCorrect){
            throw new ApiError(400,'Password Not Correct')
        }
        const {accessToken,refreshToken} = await generateAccessRefreshToken(userExist._id)
        const loggedInUser = await User.findById(userExist._id).select("-password -refreshToken")
        return res.status(200)
        .cookie('accessToken', accessToken,options)
        .cookie('refreshToken', refreshToken,options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                'User Login Success'
            )
        )
    }
)

const userProfile = asyncHandler(
    async (req,res)=>{
        console.log(req.user,'userrr');
        
    }
)

const userProfileEdit = asyncHandler(
    async (req,res)=>{
        const {first_name,last_name} = req.body
        const user = await User.findById(req.user._id)
        if(first_name){
            user.first_name = first_name
        }
        if(last_name){
            user.last_name = last_name
        }
    
      
        await user.save()
        return res.status(200).json(
            new ApiResponse(200,null,'User Profile Edited Successfully')
        )
    }
    )

const userPasswordChange = asyncHandler(
    async (req,res)=>{
        const {old_password,new_password} = req.body
        const user = await User.findById(req.user._id)
        const passwordCorrect = await user.isPasswordCorrect(old_password)
        if(!passwordCorrect){
            throw new ApiError(400,'Old Password Not Correct')
        }
        user.password = new_password
        await user.save()
        return res.status(200).json(
            new ApiResponse(200,null,'Password Changed Successfully')
        )
    }
)

const userLoggedOut = asyncHandler(
    async (req,res)=>{
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        )
        res.clearCookie('accessToken',options)
        res.clearCookie('refreshToken',options)
        return res.status(200).json(
            new ApiResponse(200,null,'Logged Out Successfully')
        )
    }
)

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})
export {userRegister,userLogin,userProfile,userProfileEdit,userPasswordChange,refreshAccessToken}