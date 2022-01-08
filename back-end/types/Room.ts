import { User } from "./User";

export interface Rooms {
  [key: string]: Room;
}

export type Room = User[];

export type IRoomName = string | number;
