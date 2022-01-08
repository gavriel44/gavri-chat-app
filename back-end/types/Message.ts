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
}

export type Message = PrivateMessage | PublicMessage;
