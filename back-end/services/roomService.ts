import rooms from "../db/rooms";
import { Room, ISocket } from "../types";

export default class RoomManager {
  _socket: ISocket;

  _currentRoomName: string;

  _userName: string;

  constructor(socket: ISocket, initialRoomName: string, userName = "") {
    this._socket = socket;
    this._currentRoomName = initialRoomName;
    this._userName = userName;
  }

  getMyRoom(): Room {
    return rooms[this.currentRoomName];
  }

  set userName(userName: string) {
    this._userName = userName;
  }

  get currentRoomName(): string {
    return this._currentRoomName;
  }

  addUserToRoom(roomName: string): void {
    this._currentRoomName = roomName;
    rooms[roomName].push({
      id: this._socket.id,
      username: this._userName,
    });
  }

  removeUserFromRoom(): void {
    rooms[this._currentRoomName] = rooms[this._currentRoomName].filter(
      (user) => user.id !== this._socket.id
    );
  }
}
