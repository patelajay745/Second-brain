"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
dotenv_1.default.config({ path: "./.env" });
const port = 8080;
(0, db_1.connectDB)()
    .then(() => {
    app_1.app.listen(port, () => {
        console.log(`Server ready on port ${port}`);
    });
})
    .catch();
exports.default = app_1.app;
