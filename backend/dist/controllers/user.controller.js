"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.getLogin = exports.registerUser = void 0;
const ApiError_1 = require("../utils/ApiError");
const asyncHandler_1 = require("../utils/asyncHandler");
const users_models_1 = require("../models/users.models");
const ApiResponse_1 = require("../utils/ApiResponse");
const zod_1 = require("zod");
const UserSchemaForZod = zod_1.z.object({
    // username: z.string().min(3).max(10),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
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
exports.registerUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const zodOutput = UserSchemaForZod.safeParse(req.body);
    if (!zodOutput.success) {
        const errorMessage = zodOutput.error.issues
            .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
            .join(", ");
        throw new ApiError_1.ApiError(411, errorMessage);
    }
    const { username, password } = req.body;
    const existeduser = yield users_models_1.User.findOne({ username });
    if (existeduser) {
        throw new ApiError_1.ApiError(403, "user already existes with this username");
    }
    const user = yield users_models_1.User.create({ username, password });
    if (!user) {
        throw new ApiError_1.ApiError(500, "Something went wrong while creating user");
    }
    const userResponse = {
        username: user.username,
    };
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(201, "User has been created", userResponse));
}));
exports.getLogin = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if ([username, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError_1.ApiError(401, "username and password are required");
    }
    let user = yield users_models_1.User.findOne({ username }).select(" -__v -createdAt -updatedAt");
    console.log(user);
    if (!user) {
        throw new ApiError_1.ApiError(403, "user doesn't exist");
    }
    const isPasswordValid = yield user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError_1.ApiError(401, "password is not correct!");
    }
    const accessToken = user.generateAccessToken();
    if (!accessToken) {
        throw new ApiError_1.ApiError(500, "something went wrong while generating token");
    }
    const userResponse = {
        username: user.username,
    };
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse_1.ApiResponse(200, "user Logged in", {
        user: userResponse,
        accessToken,
    }));
}));
exports.logoutUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse_1.ApiResponse(200, "user logged out", {}));
}));
