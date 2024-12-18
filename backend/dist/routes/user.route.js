"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.post("/", user_controller_1.registerUser);
router.post("/login", user_controller_1.getLogin);
router.post("/logout", user_controller_1.logoutUser);
exports.default = router;
