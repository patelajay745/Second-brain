import { Content } from "@/models/content.models";
import { Link } from "@/models/link.models";
import { User } from "@/models/users.models";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { nanoid } from "nanoid";

export const toggleShareBrain = asyncHandler(async (req, res) => {
  const { share } = req.body;
  const userId = req.user?._id;

  if (share && share.trim() === "true") {
    const hash = nanoid();

    let existingLink = await Link.findOne({ userId });

    if (!existingLink) {
      existingLink = await Link.create({ userId, hash });
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "LInk of the rain has been fetched",
          existingLink.hash
        )
      );
  }

  await Link.deleteOne({ userId });

  return res
    .status(200)
    .json(new ApiResponse(200, "Link set to not share", {}));
});

export const getShatedLinkData = asyncHandler(async (req, res) => {
  const shareLink = req.params["shareLink"];

  if (!shareLink) {
    throw new ApiError(401, "Please provide shareLink");
  }

  const link = await Link.findOne({ hash: shareLink });

  if (!link) {
    throw new ApiError(401, "No data Found for this brain");
  }

  const userId = link.userId;

  //   const contents = await Content.find({ userId });

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
    throw new ApiError(401, "Nothing to share from this brain");
  }

  const user = await User.findById({ _id: userId });

  if (!user) {
    throw new ApiError(500, "Something went wrong");
  }
  const data = { username: user.username, content: contents };

  return res
    .status(200)
    .json(new ApiResponse(200, "data of shared link has been fetched", data));
});
