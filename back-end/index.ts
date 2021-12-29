import config from "./utils/config";
import app from "./app";
import { createServer } from "http";
const server = createServer(app);
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./types";
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

const chatHandler = require("./socketHandlers/chatHandler");

io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    socket.broadcast.emit("sendMessage", message);
  });
});

server.listen(config.PORT, () => {
  `server listening on port ${config.PORT}`;
});
