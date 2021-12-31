import config from "./utils/config";
import app from "./app";
import { createServer } from "http";
const server = createServer(app);
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./types";
import chatHandler from "./socketHandlers/chatHandler";

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

const onConnection = (socket: Socket) => {
  chatHandler(socket, io);
};

io.on("connection", onConnection);

server.listen(config.PORT, () => {
  `server listening on port ${config.PORT}`;
});
