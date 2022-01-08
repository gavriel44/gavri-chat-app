import { Message } from "./Message";
import { Room } from "./Room";

export interface ServerToClientEvents {
  receiveMessage: (message: Message) => void;
  updateUsersInRoom: (room: Room) => void;
}

export interface ClientToServerEvents {
  sendMessage: (message: Message, cb: (error: Error) => void) => void;
}
