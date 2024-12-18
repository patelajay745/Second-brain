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
exports.getShatedLinkData = exports.toggleShareBrain = void 0;
const content_models_1 = require("../models/content.models");
const link_models_1 = require("../models/link.models");
const users_models_1 = require("../models/users.models");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const nanoid_1 = require("nanoid");
exports.toggleShareBrain = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { share } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (share && share.trim() === "true") {
        const hash = (0, nanoid_1.nanoid)();
        let existingLink = yield link_models_1.Link.findOne({ userId });
        if (!existingLink) {
            existingLink = yield link_models_1.Link.create({ userId, hash });
        }
        return res
            .status(200)
            .json(new ApiResponse_1.ApiResponse(200, "LInk of the rain has been fetched", existingLink.hash));
    }
    yield link_models_1.Link.deleteOne({ userId });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, "Link set to not share", {}));
}));
exports.getShatedLinkData = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shareLink = req.params["shareLink"];
    if (!shareLink) {
        throw new ApiError_1.ApiError(401, "Please provide shareLink");
    }
    const link = yield link_models_1.Link.findOne({ hash: shareLink });
    if (!link) {
        throw new ApiError_1.ApiError(401, "No data Found for this brain");
    }
    const userId = link.userId;
    //   const contents = await Content.find({ userId });
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
        throw new ApiError_1.ApiError(401, "Nothing to share from this brain");
    }
    const user = yield users_models_1.User.findById({ _id: userId });
    if (!user) {
        throw new ApiError_1.ApiError(500, "Something went wrong");
    }
    const data = { username: user.username, content: contents };
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, "data of shared link has been fetched", data));
}));
