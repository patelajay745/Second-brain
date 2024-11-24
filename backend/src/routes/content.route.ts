import { Router } from "express";

const router = Router();

router.post("/");
router.get("/");
router.get("/:contentId");
router.delete("/:contentId");

export default router;
