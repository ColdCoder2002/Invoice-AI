import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';



const verifyJWT = asyncHandler(async (req, res, next) => {

    let token;
    if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    } else if (req.header("Authorization")) {
        token = req.header("Authorization").replace("Bearer ", "")
    }
    if (!token) throw new ApiError(401, "Unauthorized - please login");

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Session expired, please login again")
        }
        throw new ApiError(401, "Invalid token")
    }

    const user = await User.findById(decoded._id).populate("org");
    if (!user) throw new ApiError(401, "User not found")
    req.user = user;
    next()
})

export default verifyJWT