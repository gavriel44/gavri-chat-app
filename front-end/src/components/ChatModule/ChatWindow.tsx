import { ReactElement, useContext, useEffect, useState } from "react";
import MessagesBlock from "./MessagesBlock";
import { isMessage, message } from "../../types";
import ChatInput from "./ChatInput";
import useSocket from "../../hooks/useSocket";
import UsernameContext from "../UsernameContext";

export default function ChatWindow(): ReactElement {
  const [messages, setMessages] = useState<message[]>([]);
  const username = useContext(UsernameContext);

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
          const newMessage = prevMessages.map((mes) => {
            if (mes.id === "temp") {
              mes.id = newId;
            }
            return mes;
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
