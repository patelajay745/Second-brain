import { asyncHandler } from "@/utils/asyncHandler";

export const authcheck = asyncHandler(async (req, res) => {
  return res.status(200).json({ message: "Token is valid" });
});
