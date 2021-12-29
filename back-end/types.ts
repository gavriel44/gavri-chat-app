interface ServerToClientEvents {
  sendMessage: (message: message) => void;
}

interface ClientToServerEvents {
  sendMessage: (message: message) => void;
}

interface message {
  text: string;
  username: string;
}

export { ServerToClientEvents, ClientToServerEvents };
