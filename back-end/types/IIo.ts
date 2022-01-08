import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from ".";

export type IIo = Server<ClientToServerEvents, ServerToClientEvents>;
