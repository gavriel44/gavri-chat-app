import { Button, TextField } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { ClientSocket, Destination, newMessage } from "../../types";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  handleSubmit: (value: string) => void;
  handleResetDestination: () => void;
  destination: Destination;
}

export default function ChatInput({
  handleSubmit,
  handleResetDestination,
  destination,
}: Props): ReactElement {
  const [input, setInput] = useState("");

  return (
    <div>
      {destination === "all" ? null : (
        <div>
          Sending message to {destination.username}{" "}
          <Button onClick={() => handleResetDestination()}>Cancel</Button>
        </div>
      )}
      <form className="chat-input">
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
    </div>
  );
}
