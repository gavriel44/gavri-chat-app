import React, { ReactElement, useContext } from "react";
import { message } from "../../types";
import UsernameContext from "../UsernameContext";

interface Props {
  message: message;
}

export default function Message({ message }: Props): ReactElement {
  const username = useContext(UsernameContext);
  const userNameInitials = message.username.slice(0, 2).toLocaleUpperCase();

  const isMyMessage = username === message.username;

  if (isMyMessage) {
    return (
      <div className="my-message">
        <div className="message-author">{userNameInitials}</div>
        <div className="message-content">
          <p>
            <span>{message.text} </span>

            <span className="message-status">
              {message.id === "temp" ? "sending.." : "received"}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="message">
      <div className="message-author">{userNameInitials}</div>
      <div className="message-content">
        <p>
          <span>{message.text} </span>
        </p>
      </div>
    </div>
  );
}
