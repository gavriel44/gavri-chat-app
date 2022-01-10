/* eslint-disable no-unused-vars */
import { ServerToClientMessages } from "./Message";
import { Room } from "./Room";

export interface ServerToClientEvents {
  receiveMessage: (message: ServerToClientMessages) => void;
  updateUsersInRoom: (room: Room) => void;
}

export interface ClientToServerEvents {
  sendMessage: (message: unknown, cb: (error?: Error | null) => void) => void;
  "join-room": (username: string, roomName: string) => void;
}
