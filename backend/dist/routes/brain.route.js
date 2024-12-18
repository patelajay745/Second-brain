"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brain_controller_1 = require("../controllers/brain.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/share", auth_middleware_1.verifyJWT, brain_controller_1.toggleShareBrain);
router.get("/:shareLink", brain_controller_1.getShatedLinkData);
exports.default = router;
