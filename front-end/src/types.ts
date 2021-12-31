import { Socket } from "socket.io-client";

export type ServerToClientMessage =
  | message
  | ComeInToRoomMessage
  | PrivateMessage;
export type ClientToServerMessage =
  | newMessage
  | EnterRoomMessage
  | PrivateMessage;

export interface message {
  type: "message";
  text: string;
  username: string;
  id: string;
}

export type newMessage = Omit<message, "id">;

interface ServerToClientEvents {
  receiveMessage: (message: ServerToClientMessage) => void;
  updateUsersInRoom: (room: Room) => void;
}

type Room = User[];

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

export type PrivateMessage = Omit<message, "type"> & {
  type: "PrivateMessage";
  destination: User;
  origin: User | undefined;
};

export type ComeInToRoomMessage = EnterRoomMessage & { id: string };

export interface User {
  username: string;
  id: string;
}

export type Destination = User | "all";

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const isMessageFromServer = (
  message: any
): message is ServerToClientMessage => {
  if (!message || !message?.username) {
    return false;
  }
  return true;
};
