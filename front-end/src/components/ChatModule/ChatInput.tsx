import { Button, IconButton, TextField } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { ClientSocket, Destination, newMessage } from "../../types";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

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
      {/* {destination === "all" ? null : (
        <div className="destination-hint">
          Sending message to {destination.username}{" "}
          <Button onClick={() => handleResetDestination()}>Cancel</Button>
        </div>
      )} */}
      <form className="chat-input">
        <TextField
          id="chat-input"
          label="Send"
          variant="outlined"
          name="chat-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          helperText={
            destination !== "all" ? (
              <div>
                {`Sending only to ${destination.username}`}
                <IconButton
                  // variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleResetDestination()}
                >
                  <CancelIcon />
                </IconButton>
              </div>
            ) : null
          }
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
