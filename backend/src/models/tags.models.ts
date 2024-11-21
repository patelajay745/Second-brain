import mongoose, { Schema } from "mongoose";

const tagsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Tags = mongoose.model("Tag", tagsSchema);
