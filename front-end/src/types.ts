import { Socket } from "socket.io-client";

export type ServerToClientMessage = message | ComeInToRoomMessage;
export type ClientToServerMessage = newMessage | EnterRoomMessage;

export interface message {
  type: "message";
  text: string;
  username: string;
  id: string;
}

export type newMessage = Omit<message, "id">;

interface ServerToClientEvents {
  receiveMessage: (message: ServerToClientMessage) => void;
}

interface ClientToServerEvents {
  sendMessage: (
    message: ClientToServerMessage,
    cb?: (newId: string) => void
  ) => void;
}

interface EnterRoomMessage {
  type: "EnterRoomMessage";
  username: string;
  roomNum: string;
}

export type ComeInToRoomMessage = EnterRoomMessage & { userId: string };

export interface User {
  username: string;
  id: string;
}

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const isMessageFromServer = (
  message: any
): message is ServerToClientMessage => {
  if (!message || !message?.username) {
    return false;
  }
  return true;
};
