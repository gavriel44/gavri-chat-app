import { Socket } from "socket.io-client";

export type IMessage = message | EnterRoomMessage;

export interface message {
  type: "message";
  text: string;
  username: string;
  id: string;
}

export type newMessage = Omit<message, "id">;

interface ServerToClientEvents {
  receiveMessage: (message: IMessage) => void;
}

interface ClientToServerEvents {
  sendMessage: (
    message: newMessage | EnterRoomMessage,
    cb?: (newId: string) => void
  ) => void;
}

interface EnterRoomMessage {
  type: "EnterRoomMessage";
  username: string;
  roomNum: number;
}

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const isMessage = (message: any): message is message => {
  if (!message || !message?.username) {
    return false;
  }
  return true;
};
