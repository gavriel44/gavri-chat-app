interface ServerToClientEvents {
  receiveMessage: (message: message) => void;
  enteredRoom: (username: EnterRoomMessage) => void;
}

interface ClientToServerEvents {
  sendMessage: (message: message, cb: (newId: string) => void) => void;
  enterRoom: (message: string) => void;
}

interface message {
  text: string;
  username: string;
  id: string;
  type: "message";
}

interface EnterRoomMessage {
  username: string;
  type: "EnterRoomMessage";
}

export { ServerToClientEvents, ClientToServerEvents };
