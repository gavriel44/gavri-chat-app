import { createServer } from "http";
import { Server, Socket } from "socket.io";
import config from "./utils/config";
import { ClientToServerEvents, ServerToClientEvents } from "./types";
import chatHandler from "./socketHandlers/chatHandler";
import app from "./app";

const server = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

const onConnection = (socket: Socket) => {
  chatHandler(socket, io);
};

io.on("connection", onConnection);

server.listen(config.PORT, () => {
  console.log(`server listening on port ${config.PORT}`);
});
