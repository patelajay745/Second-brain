"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authcheck_controller_1 = require("../controllers/authcheck.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.use(auth_middleware_1.verifyJWT);
authRouter.get("/check", authcheck_controller_1.authcheck);
exports.default = authRouter;
