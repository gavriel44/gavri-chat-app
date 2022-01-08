// interface ServerToClientEvents {
//   receiveMessage: (message: Message) => void;
//   updateUsersInRoom: (room: Room) => void;
// }

// interface ClientToServerEvents {
//   sendMessage: (message: Message, cb: (error: Error) => void) => void;
// }

// export type Message = message | PrivateMessage;

// type PrivateMessage = Omit<message, "type"> & {
//   type: "PrivateMessage";
//   destination: User;
// };

// interface message {
//   text: string;
//   username: string;
//   id: string;
//   type: "message";
// }

// export type IRoomName = string | number;

// interface Rooms {
//   [key: string]: Room;
// }

// export type Room = User[];

// export interface User {
//   id: string;
//   username: string;
// }

// export { ServerToClientEvents, ClientToServerEvents, Rooms };
