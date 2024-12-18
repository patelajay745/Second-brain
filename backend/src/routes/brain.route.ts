import { Router } from "express";
import {
  toggleShareBrain,
  getShatedLinkData,
} from "../controllers/brain.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post("/share", verifyJWT, toggleShareBrain);
router.get("/:shareLink", getShatedLinkData);

export default router;
