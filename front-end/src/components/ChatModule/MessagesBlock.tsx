import { ReactElement } from "react";
import Message from "./Message";
import { useAppSelector } from "../../hooks/redux";
import { selectMessages } from "../../features/messagesSlice";
import MessageBlockHeader from "./MessageBlockHeader";

export default function MessagesBlock(): ReactElement {
  const messages = useAppSelector(selectMessages);
  const reverseMessages = messages.slice().reverse();
  return (
    <div className="message-block">
      <MessageBlockHeader />
      <div className="messages-display">
        {reverseMessages.map((message) => {
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
    </div>
  );
}
