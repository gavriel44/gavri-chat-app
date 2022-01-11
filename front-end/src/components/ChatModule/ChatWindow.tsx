import { ReactElement, useContext, useEffect, useState } from "react";
import MessagesBlock from "./MessagesBlock";
import {
  isMessageFromServer,
  ReceivableMessage,
  User,
  Destination,
  SendableMessage,
} from "../../types";
import ChatInput from "./ChatInput";
import useSocket from "../../hooks/useSocket";
import UsernameContext from "../UsernameContext";
import ConnectedWindow from "./ConnectedWindow";
import { v4 as uuidv4 } from "uuid";

interface Props {
  url?: string;
}

export default function ChatWindow({ url }: Props): ReactElement {
  const [messages, setMessages] = useState<ReceivableMessage[]>([]);
  const { username, room } = useContext(UsernameContext);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [messageDestination, setMessageDestination] =
    useState<Destination>("all");

  const socket = useSocket(url);

  useEffect(() => {
    console.log("connectedUsers", connectedUsers);
  }, [connectedUsers]);

  useEffect(() => {
    if (typeof socket === "undefined") {
      return console.log("trying to connect");
    }

    const messagesListener = (message: ReceivableMessage): void => {
      if (!isMessageFromServer(message)) {
        throw new Error(" missing or invalid message format");
      }

      setMessages((prevMessages) => {
        const newMessages = prevMessages.concat(message);
        return newMessages;
      });
    };

    socket.on("receiveMessage", messagesListener);
    socket.on("updateUsersInRoom", (room) => {
      setConnectedUsers(room);
    });

    socket.emit("join-room", username, room);
  }, [socket, room, username]);

  const handleSendMessage = (text: string): void => {
    if (typeof socket === "undefined") {
      return console.log("waiting on connection");
    }
    const baseMessage = {
      text,
      username,
      id: uuidv4(),
      received: false,
    };
    let message: SendableMessage;
    if (messageDestination === "all") {
      message = {
        ...baseMessage,
        type: "PublicMessage",
      };
    } else {
      message = {
        ...baseMessage,
        type: "PrivateMessage",
        destination: messageDestination,
        origin: connectedUsers.find((user) => user.username === username),
      };
    }
    setMessages((prevMessages) => {
      // console.log("in first set", prev);
      // console.log("in first set message", JSON.stringify(message));

      const newMessages = prevMessages.concat(message);
      return newMessages;
    });

    const receivedCb = (error: Error) => {
      if (error) {
        console.log("error: ", error.message);
        return alert("error sending message");
      }
      setTimeout(() => {
        setMessages((prevMessages) => {
          const newMessages = prevMessages.map((mes) => {
            if (mes.type !== "EnterRoomMessage" && mes.id === message.id) {
              return {
                ...mes,
                received: true,
              };
            }
            return mes;
          });
          return newMessages;
        });
      }, 500);
    };

    socket.emit("sendMessage", message, receivedCb);
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
