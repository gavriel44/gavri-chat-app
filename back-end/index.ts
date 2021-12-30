import config from "./utils/config";
import app from "./app";
import { createServer } from "http";
const server = createServer(app);
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./types";
import { v4 as uuidv4 } from "uuid";
import rooms from "./db/rooms";

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

// const chatHandler = require("./socketHandlers/chatHandler");

io.on("connection", (socket) => {
  let roomNum = "1";

  socket.on("sendMessage", (message, cb) => {
    switch (message.type) {
      case "EnterRoomMessage":
        roomNum = String(message.roomNum);
        socket.join(roomNum);
        socket.to(roomNum).emit("receiveMessage", message);
        break;
      case "message":
        const newId = uuidv4();

        const newMessage = {
          ...message,
          id: newId,
        };

        cb(newId);

        socket.to(roomNum).emit("receiveMessage", newMessage);
        break;
      default:
        break;
    }
    console.log(message);
  });
});

server.listen(config.PORT, () => {
  `server listening on port ${config.PORT}`;
});
