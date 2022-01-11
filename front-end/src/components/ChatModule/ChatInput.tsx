import { Button, IconButton, TextField } from "@mui/material";
import React, { ReactElement, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectChatContext,
  updateDestination,
} from "../../features/chatContextSlice";
import { ClientSocket, SendableMessage } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { selectConnectedUsers } from "../../features/connectedUsersSlice";
import { addMessage, updateMessageStatus } from "../../features/messagesSlice";

interface Props {
  socket: ClientSocket | undefined;
}

export default function ChatInput({ socket }: Props): ReactElement {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const { destination: messageDestination, username } =
    useAppSelector(selectChatContext);
  const connectedUsers = useAppSelector(selectConnectedUsers);

  const handleResetDestination = () => {
    dispatch(updateDestination("all"));
  };

  const handleSendMessageClick = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (typeof socket === "undefined") {
      return console.log("waiting on connection");
    }
    const baseMessage = {
      text: input,
      username,
      id: uuidv4(),
      received: false,
    };
    let message: SendableMessage;
    if (messageDestination === "all") {
      message = {
        ...baseMessage,
        type: "PublicMessage",
      };
    } else {
      message = {
        ...baseMessage,
        type: "PrivateMessage",
        destination: messageDestination,
        origin: connectedUsers.find((user) => user.username === username) || {
          username: "error",
          id: "1",
        },
      };
    }

    dispatch(addMessage(message));

    const receivedCb = (error: Error) => {
      if (error) {
        console.log("error: ", error.message);
        return alert("error sending message");
      }
      setTimeout(() => {
        dispatch(updateMessageStatus({ status: true, id: message.id }));
      }, 500);
    };

    socket.emit("sendMessage", message, receivedCb);
  };

  return (
    <div>
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
            messageDestination !== "all" ? (
              <>
                {`Sending only to ${messageDestination.username}`}
                <IconButton
                  // variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleResetDestination()}
                >
                  <CancelIcon />
                </IconButton>
              </>
            ) : null
          }
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          onClick={handleSendMessageClick}
        >
          send
        </Button>
      </form>
    </div>
  );
}
