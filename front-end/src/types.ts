import { Socket } from "socket.io-client";

export type ServerToClientMessage = message | PrivateMessage | EnterRoomMessage;
export type ClientToServerMessage = message | PrivateMessage;

export interface message {
  type: "message";
  text: string;
  username: string;
  id: string;
  received: boolean;
}

interface ServerToClientEvents {
  receiveMessage: (message: ServerToClientMessage) => void;
  updateUsersInRoom: (room: Room) => void;
}

type Room = User[];

interface ClientToServerEvents {
  sendMessage: (
    message: ClientToServerMessage,
    cb: (error: Error) => void
  ) => void;

  "join-room": (username: string, roomName: string) => void;
}

interface EnterRoomMessage {
  type: "EnterRoomMessage";
  username: string;
}

export type PrivateMessage = Omit<message, "type"> & {
  type: "PrivateMessage";
  destination: User;
  origin: User | undefined;
};

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
