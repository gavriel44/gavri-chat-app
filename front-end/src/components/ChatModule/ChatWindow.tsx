import { ReactElement, useContext, useEffect, useState } from "react";
import MessagesBlock from "./MessagesBlock";
import {
  isMessageFromServer,
  ServerToClientMessage,
  message,
  User,
  Destination,
  PrivateMessage,
} from "../../types";
import ChatInput from "./ChatInput";
import useSocket from "../../hooks/useSocket";
import UsernameContext from "../UsernameContext";
import ConnectedWindow from "./ConnectedWindow";

interface Props {
  url?: string;
}

export default function ChatWindow({ url }: Props): ReactElement {
  const [messages, setMessages] = useState<ServerToClientMessage[]>([]);
  const { username, room } = useContext(UsernameContext);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [messageDestination, setMessageDestination] =
    useState<Destination>("all");

  const socket = useSocket(url);

  useEffect(() => {
    console.log("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (typeof socket === "undefined") {
      return console.log("trying to connect");
    }

    const messagesListener = (message: unknown): void => {
      if (!isMessageFromServer(message)) {
        throw new Error(" missing or invalid message format");
      }

      setMessages((prevMessages) => {
        const newMessages = prevMessages.concat([message]);
        return newMessages;
      });
    };

    socket.on("receiveMessage", messagesListener);
    socket.on("updateUsersInRoom", (room) => {
      setConnectedUsers(room);
    });

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
    let message: message | PrivateMessage;
    if (messageDestination === "all") {
      message = {
        text,
        username,
        id: "temp",
        type: "message",
      };
    } else {
      message = {
        text,
        username,
        id: "temp",
        type: "PrivateMessage",
        destination: messageDestination,
        origin: connectedUsers.find((user) => user.username === username),
      };
    }
    setMessages((prev) => {
      console.log("in first set", prev);
      console.log("in first set message", JSON.stringify(message));

      const newMessages = prev.concat([message]);
      return newMessages;
    });

    const setStatusCb = (newId: string) => {
      setTimeout(() => {
        setMessages((prevMessages) => {
          console.log("in callback", JSON.stringify(prevMessages));
          const newMessages = prevMessages.map((mes) => {
            if (
              (mes.type === "message" || mes.type === "PrivateMessage") &&
              mes.id === "temp"
            ) {
              mes.id = newId;
            }
            return mes;
          });
          return newMessages;
        });
      }, 500);
    };

    socket.emit("sendMessage", message, setStatusCb);
  };

  const handleSendTo = (user: User): void => {
    setMessageDestination(user);
  };

  const handleResetDestination = (): void => {
    setMessageDestination("all");
  };

  return (
    <div className="chat-module">
      <div className="chat-window">
        <MessagesBlock messages={messages} />
        <ChatInput
          destination={messageDestination}
          handleSubmit={handleSendMessage}
          handleResetDestination={handleResetDestination}
        />
      </div>
      <ConnectedWindow
        connectedUsers={connectedUsers}
        handleSendTo={handleSendTo}
      />
    </div>
  );
}
