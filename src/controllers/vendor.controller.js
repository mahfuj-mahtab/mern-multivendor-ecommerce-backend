import { asyncHandler } from "../utils/asyncHandler.js";

const vendorProfile = asyncHandler(
    async (req,res)=>{
        console.log('i am vendor');
        
    }
)
export {vendorProfile}