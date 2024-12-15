import { Router } from "express";
import {
  registerUser,
  getLogin,
  logoutUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/", registerUser);
router.post("/login", getLogin);
router.post("/logout", logoutUser);

export default router;
