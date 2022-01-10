import { Socket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./Event";

export type ISocket = Socket<ClientToServerEvents, ServerToClientEvents>;
