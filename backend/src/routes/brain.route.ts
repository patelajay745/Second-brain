import { Router } from "express";

const router = Router();

router.post("/share");
router.get("/:shareLink");

export default router;
