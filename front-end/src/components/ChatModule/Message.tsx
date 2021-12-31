import React, { ReactElement, useContext } from "react";
import { ServerToClientMessage } from "../../types";
import UsernameContext from "../UsernameContext";

interface Props {
  message: ServerToClientMessage;
}

export default function Message({ message }: Props): ReactElement {
  const { username } = useContext(UsernameContext);
  const userNameInitials = message.username.slice(0, 2).toLocaleUpperCase();

  const isMyMessage = username === message.username;
  switch (message.type) {
    case "message":
      if (isMyMessage) {
        return (
          <div className="my-message">
            <div className="message-author">{userNameInitials}</div>
            <div className="message-content">
              <p>
                <span>{message.text} </span>

                <span className="message-status">
                  {message.id === "temp" ? "sending.." : "delivered"}
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
    case "EnterRoomMessage":
      return (
        <div className="enter-message">
          <p>{message.username} has entered the room</p>
        </div>
      );

    case "PrivateMessage":
      if (isMyMessage) {
        return (
          <div className="my-message">
            <div className="message-author">{userNameInitials}</div>
            <div className="message-content">
              <span>{message.text} </span>

              <span className="message-status">
                {message.id === "temp" ? "sending.." : "delivered"}
              </span>
            </div>
            <div className="destination-label">
              only {message.destination.username} can see this message
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
            private message from {message.origin?.username || "unknown"}
          </div>
        </div>
      );

    default:
      return <p>error</p>;
  }
}
