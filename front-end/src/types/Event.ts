import { ReceivableMessage, SendableMessage } from "./Message";
import { Room } from ".";

export interface ServerToClientEvents {
  receiveMessage: (message: ReceivableMessage) => void;
  updateUsersInRoom: (room: Room) => void;
}

export interface ClientToServerEvents {
  sendMessage: (message: SendableMessage, cb: (error: Error) => void) => void;

  "join-room": (username: string, roomName: string) => void;
}
