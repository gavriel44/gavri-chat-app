import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./Event";

export type IIo = Server<ClientToServerEvents, ServerToClientEvents>;
