import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";



const registerUser = asyncHandler(async (req, res) => {
    
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
        throw new ApiError(409, 'Email already Registered!')
    }
    const user = await User.create({ name, email, password });

    res.status(201).json(
        new ApiResponse(201, 'User registered successfully', {
            id: user._id,
            name: user.name,
            email:user.email
        })
    )
})

export { registerUser };