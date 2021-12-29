import React, { ReactElement, useEffect, useState } from "react";
import { message, ClientSocket } from "../../types";
import Message from "./Message";
import { isMessage } from "../../types";

interface Props {
  socket: ClientSocket | undefined;
}

export default function MessagesBlock({ socket }: Props): ReactElement {
  const [messages, setMessages] = useState<message[]>([]);

  useEffect(() => {
    const messagesListener = (message: unknown): void => {
      if (isMessage(message)) {
        setMessages(messages.concat([message]));
      }
    };
    if (typeof socket === "undefined") {
      return console.log("trying to connect");
    }

    socket.on("receiveMessage", messagesListener);
  }, [socket, messages]);
  return (
    <div>
      {messages.map((message) => {
        return <Message message={message} key={message.id} />;
      })}
    </div>
  );
}
