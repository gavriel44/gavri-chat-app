import { Button, TextField } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { ClientSocket, newMessage } from "../../types";
import SendIcon from "@mui/icons-material/Send";

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
    <form className="chat-input">
      {/* <input
          type="text"
          name="chat-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        /> */}
      <TextField
        id="chat-input"
        label="Outlined"
        variant="outlined"
        name="chat-input"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          console.log("test");

          handleSubmit(input);
        }}
      >
        Send
      </Button>
    </form>
  );
}
