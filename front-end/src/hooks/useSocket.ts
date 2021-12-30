import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ClientSocket } from "../types";

const useSocket = (url?: string): ClientSocket | undefined => {
  const [socket, setSocket] = useState<ClientSocket>();

  useEffect(() => {
    const newSocket: ClientSocket = url ? io(url) : io();
    newSocket.on("connect", () => {
      console.log("connected to socket");
      setSocket(newSocket);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
};

export default useSocket;
