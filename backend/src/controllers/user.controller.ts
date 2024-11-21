import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/users.models";
import { ApiResponse } from "../utils/ApiResponse";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if ([username, password].some((field) => field.trim() === "")) {
    throw new ApiError(401, "username and password are required");
  }

  const user = await User.create({ username, password });

  if (!user) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  console.log(new ApiResponse(201, "User has been created", user));
  return res
    .status(201)
    .json(new ApiResponse(201, "User has been created", user));
});

export const getLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if ([username, password].some((field) => field.trim() === "")) {
    throw new ApiError(401, "username and password are required");
  }

  let user = await User.findOne({ username }).select(
    " -__v -createdAt -updatedAt"
  );

  console.log(user);

  if (!user) {
    throw new ApiError(401, "user doesn't exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "password is not correct!");
  }

  const accessToken = user.generateAccessToken();

  if (!accessToken) {
    throw new ApiError(500, "something went wrong while generating token");
  }

  const userResponse: { username: string } = {
    username: user.username,
  };

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "user Logged in", {
        user: userResponse,
        accessToken,
      })
    );
});
