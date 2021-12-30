interface ServerToClientEvents {
  receiveMessage: (message: message | EnterRoomMessage) => void;
}

interface ClientToServerEvents {
  sendMessage: (message: Message, cb?: (newId: string) => void) => void;
}

type Message = message | EnterRoomMessage;

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
  [key: string]: room;
}

type room = String[];

export { ServerToClientEvents, ClientToServerEvents, Rooms };
