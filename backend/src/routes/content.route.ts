import { Router } from "express";

import {
  createContent,
  getAllContents,
  getAContent,
} from "../controllers/content.controller";
import { verifyJWT } from "@/middlewares/auth.middleware";

const router = Router();

router.use(verifyJWT);

router.post("/", createContent);
router.get("/", getAllContents);
router.get("/:contentId", getAContent);
router.delete("/:contentId");

export default router;
