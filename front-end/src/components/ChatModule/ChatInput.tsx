import React, { ReactElement, useEffect, useState } from "react";
import { ClientSocket, newMessage } from "../../types";

interface Props {
  socket: ClientSocket | undefined;
  username: string;
}

export default function ChatInput({ socket, username }: Props): ReactElement {
  const [input, setInput] = useState("");

  const handleSubmit = (text: string): void => {
    if (typeof socket === "undefined") {
      return console.log("waiting on connection");
    }
    const message: newMessage = {
      text,
      username,
    };
    socket.emit("sendMessage", message);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="chat-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log("test");

            handleSubmit(input);
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
