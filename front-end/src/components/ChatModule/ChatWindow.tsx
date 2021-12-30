import React, { ReactElement, useEffect, useState } from "react";
import MessagesBlock from "./MessagesBlock";
import { io } from "socket.io-client";
import { ClientSocket, isMessage, message } from "../../types";
import ChatInput from "./ChatInput";

export default function ChatWindow(): ReactElement {
  const [socket, setSocket] = useState<ClientSocket>();
  const [messages, setMessages] = useState<message[]>([]);

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

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    const messagesListener = (message: unknown): void => {
      if (isMessage(message)) {
        console.log(message);

        setMessages((prevMessages) => {
          const newMessages = prevMessages.concat([message]);
          return newMessages;
        });
      }
    };
    if (typeof socket === "undefined") {
      return console.log("trying to connect");
    }

    socket.on("receiveMessage", messagesListener);
  }, [socket]);

  return (
    <div className="chat-window">
      <MessagesBlock messages={messages} />
      <ChatInput socket={socket} username={"gavri"} />
    </div>
  );
}
