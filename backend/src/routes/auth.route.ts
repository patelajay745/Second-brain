import { authcheck } from "@/controllers/authcheck.controller";
import { verifyJWT } from "@/middlewares/auth.middleware";
import { Router } from "express";

const authRouter = Router();

authRouter.use(verifyJWT);

authRouter.get("/check", authcheck);

export default authRouter;
