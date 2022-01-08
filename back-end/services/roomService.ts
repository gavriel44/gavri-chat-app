import rooms from "../db/rooms";
import { Room, IRoomName, User } from "../types";

function getRoom(roomName: IRoomName): Room {
  return rooms[roomName];
}

function addUserToRoom(roomName: IRoomName, user: User): void {
  rooms[roomName].push(user);
}

function removeUserFromRoom(roomName: IRoomName, userId: string): void {
  rooms[roomName] = rooms[roomName].filter((user) => user.id !== userId);
}

const roomService = {
  getRoom,
  addUserToRoom,
  removeUserFromRoom,
};

export default roomService;
