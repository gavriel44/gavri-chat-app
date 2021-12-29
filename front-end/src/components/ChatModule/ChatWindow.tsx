import React, { ReactElement, useEffect, useState } from "react";
import MessagesBlock from "./MessagesBlock";
import { io } from "socket.io-client";
import { ClientSocket } from "../../types";
import ChatInput from "./ChatInput";

export default function ChatWindow(): ReactElement {
  const [socket, setSocket] = useState<ClientSocket>();

  useEffect(() => {
    const newSocket: ClientSocket = io();
    newSocket.on("connect", () => {
      console.log("connected to socket");
      setSocket(newSocket);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div>
      <MessagesBlock socket={socket} />
      <ChatInput socket={socket} username={"gavri"} />
    </div>
  );
}
