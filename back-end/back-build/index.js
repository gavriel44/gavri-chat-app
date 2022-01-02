"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const server = (0, http_1.createServer)(app_1.default);
const socket_io_1 = require("socket.io");
const chatHandler_1 = __importDefault(require("./socketHandlers/chatHandler"));
const io = new socket_io_1.Server(server);
const onConnection = (socket) => {
    (0, chatHandler_1.default)(socket, io);
};
io.on("connection", onConnection);
server.listen(config_1.default.PORT, () => {
    `server listening on port ${config_1.default.PORT}`;
});
