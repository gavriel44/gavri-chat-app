import { User } from "./User";

export type Room = User[];

export interface Rooms {
  [key: string]: Room;
}

export type IRoomName = string;
