import React, { ReactElement } from "react";
import { ServerToClientMessage } from "../../types";
import Message from "./Message";

interface Props {
  messages: ServerToClientMessage[];
}

export default function MessagesBlock({ messages }: Props): ReactElement {
  return (
    <div className="message-block">
      {messages.map((message) => {
        return (
          <Message
            message={message}
            key={
              message.type !== "EnterRoomMessage"
                ? message.id
                : message.username
            }
          />
        );
      })}
    </div>
  );
}
