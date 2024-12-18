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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const ApiError_1 = require("../utils/ApiError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_models_1 = require("../models/users.models");
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
            ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.split("Bearer ")[1]);
        if (!token) {
            throw new ApiError_1.ApiError(401, "Unauthorized request");
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new ApiError_1.ApiError(500, "Access token secret is not defined");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = yield users_models_1.User.findOne({ _id: decodedToken._id }).select("-password -createdAt -updatedAt -__v");
        if (!user) {
            throw new ApiError_1.ApiError(401, "Invalid Token");
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Unauthorized request" });
    }
});
exports.verifyJWT = verifyJWT;
