import { ApiError } from "../utils/apiError.js";

const checkVendor = (req, res, next) => {
    try {
        if (!req.user) {
            throw new ApiError(401, "Unauthorized: No user data found");
        }

        if (req.user.role !== "VENDOR") {
            throw new ApiError(401, "User Is Not Vendor");
        }

        next(); 
    } catch (error) {
        throw new ApiError(500, "Something Went Wrong");

    }
};

export default checkVendor;
