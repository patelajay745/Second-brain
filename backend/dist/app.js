"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)()
// cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// })
);
app.use(express_1.default.json({
    limit: "16kb",
}));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
//routes
const user_route_1 = __importDefault(require("./routes/user.route"));
const content_route_1 = __importDefault(require("./routes/content.route"));
const brain_route_1 = __importDefault(require("./routes/brain.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/content", content_route_1.default);
app.use("/api/v1/brain", brain_route_1.default);
app.use("/api/v1/auth", auth_route_1.default);
