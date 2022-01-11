import { ReactElement } from "react";
import Message from "./Message";
import { useAppSelector } from "../../hooks/redux";
import { selectMessages } from "../../features/messagesSlice";

export default function MessagesBlock(): ReactElement {
  const messages = useAppSelector(selectMessages);
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
