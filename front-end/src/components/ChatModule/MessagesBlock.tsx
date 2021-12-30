import React, { ReactElement, useEffect, useState } from "react";
import { message, ClientSocket } from "../../types";
import Message from "./Message";
import { isMessage } from "../../types";

interface Props {
  messages: message[];
}

export default function MessagesBlock({ messages }: Props): ReactElement {
  return (
    <div className="message-block">
      {messages.map((message) => {
        return <Message message={message} key={message.id} />;
      })}
    </div>
  );
}
