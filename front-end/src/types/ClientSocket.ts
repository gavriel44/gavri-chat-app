import { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from ".";

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
