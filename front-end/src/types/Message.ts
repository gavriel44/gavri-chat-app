import { User } from "./User";

interface BaseMessage {
  text: string;
  username: string;
  id: string;
  received: boolean;
}

export interface PrivateMessage extends BaseMessage {
  type: "PrivateMessage";
  destination: User;
  origin: User | undefined;
}

export interface PublicMessage extends BaseMessage {
  type: "PublicMessage";
}

interface EnterRoomMessage {
  type: "EnterRoomMessage";
  username: string;
}

export type SendableMessage = PrivateMessage | PublicMessage;
export type ReceivableMessage =
  | PrivateMessage
  | PublicMessage
  | EnterRoomMessage;
