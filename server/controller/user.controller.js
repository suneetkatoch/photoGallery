import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

import verifyEmailTemplate from "../utils/verificationEmailTemplate.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/accessTokens.js";
import uploadImageClodinary from "../utils/uploadImageCloudniry.js";
import generateOtp from "../utils/getOTP.js";
import forgetPasswordEmailTemplate from "../utils/ForgetPasswordOtp.js";
import jwt from "jsonwebtoken";
// register user
export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return response.json({
        message: "Already register email",
        error: true,
        success: false,
      });
    }

    const payload = {
      name,
      email,
      password,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

   

    return response.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//verify emaol

//login user
export async function loginUserController(request, response) {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({
        message: "provide email, password",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.json({
        message: "User not registered",
        error: true,
        success: false,
      });
    }
    
    
    if (await user.matchPassword(password)) {
      const refreshToken = await generateRefreshToken(user?._id);
      const accessToken = await generateAccessToken(user?._id);

      const newUser = await UserModel.findByIdAndUpdate(
        user?._id,
        { refresh_token: refreshToken, forgot_password_otp: "",forgot_password_expiry:"" },
        { new: true }
      );

      const cookieOptions = {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      response.cookie("refreshToken", refreshToken, cookieOptions);
      response.cookie("accessToken", accessToken, cookieOptions);

      return response.json({
        message: "User login successfully",
        error: false,
        success: true,
        data: {
          refreshToken,
          accessToken,
          user,
        },
      });
    } else {
      return response.status(400).json({
        message: "Invalid email or password",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//logout user
export async function logoutUserController(request, response) {
  try {
    const { refreshToken } = request.cookies;
    if (!refreshToken) {
      return response.status(500).json({
        message: "Refresh token is required",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ refresh_token: refreshToken });
    if (!user) {
      return response.json({
        message: "Invalid refresh token",
        error: true,
        success: false,
      });
    }
    const updateUser = await UserModel.updateOne(
      { refresh_token: refreshToken },
      {
        refresh_token: "",
      }
    );
    const cookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    response.clearCookie("refreshToken", cookieOptions);
    response.clearCookie("accessToken", cookieOptions);
    return response.json({
      message: "User logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//REFRESH TOKEN FUNCTIONALITYe
export async function refreshTokenController(request, response) {
  try {
    const refreshToken =
      request.cookies?.refreshToken ||
      request?.headers?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return response.status(401).json({
        message: "Refresh token is required",
        error: true,
        success: false,
      });
    }

    const decodedToken = await jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (!decodedToken) {
      return response.status(401).json({
        message: "token is expired",
        error: true,
        success: false,
      });
    }
    const accessToken = await generateAccessToken({
      id: decodedToken.id,
    });
    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return response.json({
      message: "Access token generated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


