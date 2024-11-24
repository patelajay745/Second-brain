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
  const { type, link, title, tags: rawTags } = req.body;

  if (
    [type, link, title, rawTags].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(401, "Please provide all required fields");
  }

  let tags: string[];

  tags = JSON.parse(rawTags);
  if (!Array.isArray(tags)) {
    throw new ApiError(400, "Tags must be an array");
  }

  const tagDocuments = await Promise.all(
    tags.map((tagName: string) =>
      Tags.findOneAndUpdate<ITag>(
        { title: tagName.toLowerCase().trim() },
        { title: tagName.toLowerCase().trim() },
        { upsert: true, new: true }
      )
    )
  );

  const tagIds = tagDocuments.map((tag) => tag._id);

  const content = await Content.create({
    type,
    link,
    title,
    tags: tagIds,
    userId: req.user?._id,
  });

  const populatedContent = await content.populate({
    path: "tags",
    select: "title -_id",
  });

  if (!populatedContent) {
    throw new ApiError(500, "Something went wrong while creating content");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Content has been added", populatedContent));
});

export const getAllContents = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  // const contents = await Content.find({ userId: userId });
  const contents = await Content.aggregate([
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
            in:"$$tag.title"
          }
        },
        link: 1,
        type: 1,
        title: 1,
      },
    },
  ]);

  if (!contents) {
    throw new ApiError(401, "No content found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "contents has been fetched", contents));
});
