import React, { ReactElement } from "react";
import { IMessage } from "../../types";
import Message from "./Message";

interface Props {
  messages: IMessage[];
}

export default function MessagesBlock({ messages }: Props): ReactElement {
  return (
    <div className="message-block">
      {messages.map((message) => {
        return (
          <Message
            message={message}
            key={message.type === "message" ? message.id : message.username}
          />
        );
      })}
    </div>
  );
}
