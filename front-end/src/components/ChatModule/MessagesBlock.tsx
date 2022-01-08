import React, { ReactElement } from "react";
import { ReceivableMessage } from "../../types";
import Message from "./Message";

interface Props {
  messages: ReceivableMessage[];
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
