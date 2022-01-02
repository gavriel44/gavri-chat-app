"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// const express = require("express");
// const cors = require("cors");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.static("build"));
app.get("/", (_req, res) => {
    res.send("hello world");
});
exports.default = app;
