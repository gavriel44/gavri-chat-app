import React, { ReactElement, useEffect, useState } from "react";
import MessagesBlock from "./MessagesBlock";
import { io } from "socket.io-client";
import { ClientSocket, isMessage, message } from "../../types";
import ChatInput from "./ChatInput";
import useSocket from "../../hooks/useSocket";

export default function ChatWindow(): ReactElement {
  const [messages, setMessages] = useState<message[]>([]);

  const socket = useSocket();

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
