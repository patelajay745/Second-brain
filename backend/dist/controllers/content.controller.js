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
exports.deleteAContent = exports.getAContent = exports.getAllContents = exports.createContent = void 0;
const ApiResponse_1 = require("../utils/ApiResponse");
const content_models_1 = require("../models/content.models");
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const tags_models_1 = require("../models/tags.models");
const mongoose_1 = __importDefault(require("mongoose"));
exports.createContent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { type, link, title, tags: rawTags } = req.body;
    console.log(req.body);
    if ([type, link, title, rawTags].some((field) => !field || (typeof field === "string" && field.trim() === ""))) {
        throw new ApiError_1.ApiError(401, "Please provide all required fields");
    }
    let tags;
    console.log(rawTags);
    if (Array.isArray(rawTags)) {
        tags = rawTags;
    }
    else if (typeof rawTags === "string") {
        try {
            tags = JSON.parse(rawTags);
        }
        catch (error) {
            throw new ApiError_1.ApiError(400, "Invalid tags format");
        }
    }
    else {
        throw new ApiError_1.ApiError(400, "Tags must be an array or valid JSON string");
    }
    const tagDocuments = yield Promise.all(tags.map((tagName) => tags_models_1.Tags.findOneAndUpdate({ title: tagName.toLowerCase().trim() }, { title: tagName.toLowerCase().trim() }, { upsert: true, new: true })));
    const tagIds = tagDocuments.map((tag) => tag._id);
    const content = yield content_models_1.Content.create({
        type,
        link,
        title,
        tags: tagIds,
        userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
    });
    const populatedContent = yield content.populate({
        path: "tags",
        select: "title -_id",
    });
    if (!populatedContent) {
        throw new ApiError_1.ApiError(500, "Something went wrong while creating content");
    }
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(201, "Content has been added", populatedContent));
}));
exports.getAllContents = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    // const contents = await Content.find({ userId: userId });
    const contents = yield content_models_1.Content.aggregate([
        {
            $match: {
                userId,
            },
        },
        {
            $lookup: {
                from: "tags",
                localField: "tags",
                foreignField: "_id",
                as: "tags",
                pipeline: [
                    {
                        $project: {
                            title: 1,
                            _id: 0,
                        },
                    },
                ],
            },
        },
        {
            $project: {
                tags: {
                    $map: {
                        input: "$tags",
                        as: "tag",
                        in: "$$tag.title",
                    },
                },
                link: 1,
                type: 1,
                title: 1,
            },
        },
    ]);
    if (!contents) {
        throw new ApiError_1.ApiError(401, "No content found");
    }
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, "contents has been fetched", contents));
}));
exports.getAContent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params["contentId"];
    console.log(contentId);
    // const contents = await Content.find({ _id: contentId });
    const contents = yield content_models_1.Content.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(contentId),
            },
        },
        {
            $lookup: {
                from: "tags",
                localField: "tags",
                foreignField: "_id",
                as: "tags",
                pipeline: [
                    {
                        $project: {
                            title: 1,
                            _id: 0,
                        },
                    },
                ],
            },
        },
        {
            $project: {
                tags: {
                    $map: {
                        input: "$tags",
                        as: "tag",
                        in: "$$tag.title",
                    },
                },
                link: 1,
                type: 1,
                title: 1,
            },
        },
    ]);
    if (!contents) {
        throw new ApiError_1.ApiError(401, "No content found");
    }
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, "contents has been fetched", contents));
}));
exports.deleteAContent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const contentId = req.params["contentId"];
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const content = yield content_models_1.Content.findById(contentId);
    if (!content) {
        throw new ApiError_1.ApiError(404, "Content not found");
    }
    if (((_b = content.userId) === null || _b === void 0 ? void 0 : _b.toString()) !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
        throw new ApiError_1.ApiError(403, "Unauthorized to delete this content");
    }
    yield content_models_1.Content.deleteOne({
        _id: contentId,
        userId: userId,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, "contents has been deleted", {}));
}));
