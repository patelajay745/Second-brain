import { ApiError } from "@/utils/ApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/users.models";
import { asyncHandler } from "@/utils/asyncHandler";
import { CustomRequest } from "@/types/customRequest";
import { NextFunction, Response } from "express";

interface IDecodedToken extends JwtPayload {
  _id: string;
}

export const verifyJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.split("Bearer ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new ApiError(500, "Access token secret is not defined");
    }
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    ) as IDecodedToken;

    const user = await User.findOne({ _id: decodedToken._id }).select(
      "-password -createdAt -updatedAt -__v"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Token");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Unauthorized request" });
  }
};
