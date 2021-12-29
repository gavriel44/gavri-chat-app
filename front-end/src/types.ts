import { Socket } from "socket.io-client";

export interface message {
  text: string;
  username: string;
  id: string;
}

interface ServerToClientEvents {
  receiveMessage: (message: message) => void;
}

interface ClientToServerEvents {
  sendMessage: message;
}

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const isMessage = (data: any): data is message => {
  if (!data || typeof data?.text !== "string" || typeof data?.id !== "string") {
    throw new Error("message missing of invalid format");
  }
  return true;
};
