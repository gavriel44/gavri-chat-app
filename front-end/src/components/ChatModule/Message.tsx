import React, { ReactElement } from "react";
import { message } from "../../types";

interface Props {
  message: message;
}

export default function Message({ message }: Props): ReactElement {
  const userNameInitials = message.username.slice(0, 2).toLocaleUpperCase();
  return (
    <div className="message">
      <div className="message-author">{userNameInitials}</div>
      <div className="message-content">
        <p>{message.text}</p>
      </div>
    </div>
  );
}
