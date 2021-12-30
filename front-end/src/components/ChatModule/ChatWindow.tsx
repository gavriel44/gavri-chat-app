import { ReactElement, useContext, useEffect, useState } from "react";
import MessagesBlock from "./MessagesBlock";
import {
  isMessageFromServer,
  ServerToClientMessage,
  message,
  User,
} from "../../types";
import ChatInput from "./ChatInput";
import useSocket from "../../hooks/useSocket";
import UsernameContext from "../UsernameContext";

export default function ChatWindow(): ReactElement {
  const [messages, setMessages] = useState<ServerToClientMessage[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const { username, room } = useContext(UsernameContext);

  const socket = useSocket();

  useEffect(() => {
    if (typeof socket === "undefined") {
      return console.log("trying to connect");
    }

    const messagesListener = (message: unknown): void => {
      if (!isMessageFromServer(message)) {
        throw new Error(" missing or invalid message format");
      }

      if (message.type === "EnterRoomMessage") {
        setConnectedUsers((prevConnectedUsers) => {
          const newUser: User = {
            username: message.username,
            id: message.userId,
          };
          const newConnectedUsers = prevConnectedUsers.concat([newUser]);
          return newConnectedUsers;
        });
      }

      setMessages((prevMessages) => {
        const newMessages = prevMessages.concat([message]);
        return newMessages;
      });
    };

    socket.on("receiveMessage", messagesListener);

    socket.emit("sendMessage", {
      type: "EnterRoomMessage",
      username,
      roomNum: room,
    });
  }, [socket, room, username]);

  const handleSendMessage = (text: string): void => {
    if (typeof socket === "undefined") {
      return console.log("waiting on connection");
    }
    const message: message = {
      text,
      username,
      id: "temp",
      type: "message",
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
            if (mes.type === "message" && mes.id === "temp") {
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
