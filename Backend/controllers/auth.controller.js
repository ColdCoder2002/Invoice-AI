import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) throw new ApiError(409, "Email already registered!");

  const user = await User.create({ name, email, password });

  const createdUser = await User.findById(user._id);

  res.status(201).json(new ApiResponse(201, createdUser, "User Registered!"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) throw new ApiError(401, "Invalid credentials");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  const loggedInUser = await User.findById(user._id);

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, loggedInUser, "Login Sccessfull!"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "Logout Successful"));
});

export { registerUser, loginUser, logoutUser };
