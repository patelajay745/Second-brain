import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/users.models";
import { ApiResponse } from "../utils/ApiResponse";
import { z, ZodError } from "zod";

const UserSchemaForZod = z.object({
  // username: z.string().min(3).max(10),
  username: z.string(),
  password: z.string(),
  // password: z
  //   .string()
  //   .min(8)
  //   .max(20)
  //   .refine(
  //     (v) => {
  //       return /^(?=.*[A-Z]).+$/g.test(v);
  //     },
  //     { message: "At least one uppercase expected" }
  //   )
  //   .refine(
  //     (v) => {
  //       return /^(?=.*[a-z]).+$/g.test(v);
  //     },
  //     { message: "At least one uppercase expected" }
  //   )
  //   .refine(
  //     (v) => {
  //       return /^(?=.*[0-9]).+$/g.test(v);
  //     },
  //     { message: "At least one digit expected" }
  //   )
  //   .refine(
  //     (v) => {
  //       return /^(?=.*[^a-zA-Z0-9]).+$/g.test(v);
  //     },
  //     { message: "At least one symbol expected" }
  //   ),
});

export const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const zodOutput:
    | { success: true; data: unknown }
    | { success: false; error: ZodError } = UserSchemaForZod.safeParse(
    req.body
  );

  if (!zodOutput.success) {
    const errorMessage = zodOutput.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");

    throw new ApiError(411, errorMessage);
  }

  const { username, password } = req.body;

  const existeduser = await User.findOne({ username });

  if (existeduser) {
    throw new ApiError(403, "user already existes with this username");
  }

  const user = await User.create({ username, password });

  if (!user) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  const userResponse: { username: string } = {
    username: user.username,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, "User has been created", userResponse));
});

export const getLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if ([username, password].some((field) => !field || field.trim() === "")) {
    throw new ApiError(401, "username and password are required");
  }

  let user = await User.findOne({ username }).select(
    " -__v -createdAt -updatedAt"
  );

  console.log(user);

  if (!user) {
    throw new ApiError(403, "user doesn't exist");
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
