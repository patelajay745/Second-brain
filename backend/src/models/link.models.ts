import mongoose, { Schema } from "mongoose";

const linkSchema = new Schema(
  {
    hash: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Link = mongoose.model("Link", linkSchema);
