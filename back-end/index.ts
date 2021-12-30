import config from "./utils/config";
import app from "./app";
import { createServer } from "http";
const server = createServer(app);
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./types";
import { v4 as uuidv4 } from "uuid";

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

const chatHandler = require("./socketHandlers/chatHandler");

io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    console.log(message);
    const newMessage = {
      ...message,
      id: uuidv4(),
    };

    socket.broadcast.emit("receiveMessage", newMessage);
  });
});

server.listen(config.PORT, () => {
  `server listening on port ${config.PORT}`;
});
