import { Router } from "express";
import { registerUser, getLogin } from "../controllers/user.controller";

const router = Router();

router.post("/", registerUser);
router.post("/login", getLogin);

export default router;
