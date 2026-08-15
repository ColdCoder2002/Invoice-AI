import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";



const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) throw new ApiError(409, "Email already registered!");

    const user = await User.create({ name, email, password });

    const createdUser = await User.findById(user._id);

    res.status(201).json(new ApiResponse(201, createdUser, "User Registered!"))
})

export {registerUser}