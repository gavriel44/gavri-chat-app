import React, { ReactElement, useEffect, useState } from "react";
import MessagesBlock from "./MessagesBlock";
import { io } from "socket.io-client";
import { ClientSocket, isMessage, message, newMessage } from "../../types";
import ChatInput from "./ChatInput";
import useSocket from "../../hooks/useSocket";

export default function ChatWindow(): ReactElement {
  const [messages, setMessages] = useState<message[]>([]);

  const socket = useSocket();

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

  const username = "gavri";

  const handleSendMessage = (text: string): void => {
    if (typeof socket === "undefined") {
      return console.log("waiting on connection");
    }
    const message: message = {
      text,
      username,
      id: "temp",
    };
    setMessages((prev) => {
      const newMessages = prev.concat([message]);
      return newMessages;
    });

    socket.emit("sendMessage", message, (newId: string) => {
      setTimeout(() => {
        console.log("in callback", messages);
        setMessages((prevMessages) => {
          const newMessage = prevMessages.map((m) => {
            if (m.id === "temp") {
              m.id = newId;
            }
            return m;
          });
          return newMessage;
        });
      }, 500);
    });
  };

  return (
    <div className="chat-window">
      <MessagesBlock messages={messages} />
      <ChatInput handleSubmit={handleSendMessage} />
    </div>
  );
}
