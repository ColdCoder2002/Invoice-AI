import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Organization from "../models/organization.model.js"; 

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

  const org = await Organization.create({
    name: `${name}'s Organization`,
    owner: user._id,
    members: []
  });

  user.org = org._id;
  await user.save();

  const createdUser = await User.findById(user._id).populate("org");

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

  const loggedInUser = await User.findById(user._id).populate("org");

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, loggedInUser, "Login Sccessfull!"));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "Logout Successful"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized - no refresh token");
  }

  let decoded;
  try {
    decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Refresh Token expired, please login again");
    }
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await User.findById(decoded._id).select("+refreshToken");
  if (!user) throw new ApiError(401, "User not found");

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Refresh token mismatch - please login again");
  }

  const newAccessToken = user.generateAccessToken;
  const newRfreshToken = user.generateRefreshToken;

  user.refreshToken = newRfreshToken;
  await user.save();

  res
    .status(200)
    .cookie("accessToken", newAccessToken, cookieOptions)
    .cookie("refreshToken", newRfreshToken, cookieOptions)
    .json(new ApiResponse(200, null, "Access token refreshed successfully"));
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
