interface ServerToClientEvents {
  receiveMessage: (message: Message) => void;
  updateUsersInRoom: (room: Room) => void;
}

interface ClientToServerEvents {
  sendMessage: (message: Message, cb?: (newId: string) => void) => void;
}

export type Message = message | EnterRoomMessage | PrivateMessage;

type PrivateMessage = Omit<message, "type"> & {
  type: "PrivateMessage";
  destination: User;
};

interface message {
  text: string;
  username: string;
  id: string;
  type: "message";
}

interface EnterRoomMessage {
  username: string;
  roomNum: Number;
  type: "EnterRoomMessage";
}

interface Rooms {
  [key: string]: Room;
}

export type Room = User[];

interface User {
  id: string;
  username: string;
}

export { ServerToClientEvents, ClientToServerEvents, Rooms };
