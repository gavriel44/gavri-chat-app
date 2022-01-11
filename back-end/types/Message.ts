import { User } from "./User";

export interface BaseMessage {
  text: string;
  username: string;
  id: string;
}

export interface PublicMessage extends BaseMessage {
  type: "PublicMessage";
}

export interface PrivateMessage extends BaseMessage {
  type: "PrivateMessage";
  destination: User;
  origin: User;
}

export interface EnterRoomMessage {
  type: "EnterRoomMessage";
  username: string;
}

export type CToSMessagesTypes = "PrivateMessage" | "PublicMessage";

export type ServerToClientMessages =
  | PrivateMessage
  | PublicMessage
  | EnterRoomMessage;
export type ClientToServerMessages = PrivateMessage | PublicMessage;
