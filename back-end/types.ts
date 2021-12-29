interface ServerToClientEvents {
  receiveMessage: (message: message) => void;
}

interface ClientToServerEvents {
  sendMessage: (message: message) => void;
}

interface message {
  text: string;
  username: string;
  id: string;
}

export { ServerToClientEvents, ClientToServerEvents };
