import React, { ReactElement, useEffect, useState } from "react";
import MessagesBlock from "./MessagesBlock";
import { io } from "socket.io-client";
import { ClientSocket } from "../../types";

export default function ChatWindow(): ReactElement {
  const [socket, setSocket] = useState<ClientSocket>();

  useEffect(() => {
    const newSocket: ClientSocket = io();
    newSocket.on("connect", () => {
      setSocket(newSocket);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div>
      <MessagesBlock socket={socket} />
    </div>
  );
}
