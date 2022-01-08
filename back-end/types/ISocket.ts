import { Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from ".";

export type ISocket = Socket<ClientToServerEvents, ServerToClientEvents>;
