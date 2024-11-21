import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema(
  {
    link: {
      type: String,
    },
    type: {
      type: String,
    },
    title: {
      type: String,
    },
    tags: {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Content = mongoose.model("Content", contentSchema);
