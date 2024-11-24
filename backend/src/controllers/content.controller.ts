import { ApiResponse } from "../utils/ApiResponse";
import { Content } from "../models/content.models";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { Tags } from "../models/tags.models";
import mongoose from "mongoose";

interface ITag {
  _id: mongoose.Types.ObjectId;
  title: string;
}

export const createContent = asyncHandler(async (req, res) => {
  const { type, link, title, tags } = req.body;

  if (
    [type, link, title, tags].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(401, "Please provide all required fields");
  }

  console.log(req.user);

  const tagDocuments = await tags.map((tagName: string) =>
    Tags.findOneAndUpdate<ITag>(
      { title: tagName.toLowerCase().trim() },
      { title: tagName.toLowerCase().trim() },
      { upsert: true, new: true }
    )
  );

  const tagIds = tagDocuments.map((tag: ITag) => tag._id);

  const content = await Content.create({
    type,
    link,
    title,
    tags: tagIds,
    userId: req.user?._id,
  });

  if (!content) {
    throw new ApiError(500, "Something went wrong while creating content");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Content has been added", content));
});
