import { Button, ButtonProps, styled } from "@mui/material";
import React, { ReactElement, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectChatContext } from "../../features/chatContextSlice";
import { ClientSocket, SendableMessage } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { addMessage, updateMessageStatus } from "../../features/messagesSlice";
import { blue, purple } from "@mui/material/colors";

interface Props {
  socket: ClientSocket | undefined;
}

export default function ChatInput({ socket }: Props): ReactElement {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const { destination: messageDestination, username } =
    useAppSelector(selectChatContext);

  // const handleResetDestination = () => {
  //   dispatch(updateDestination("all"));
  // };

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

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  }));

  return (
    <div>
      <form className="chat-input">
        <div className="test-chat-input">
          <input
            id="chat-input"
            // label="Send"
            // variant="outlined"
            placeholder="Add your message"
            name="chat-input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            // helperText={
            //   messageDestination !== "all" ? (
            //     <>
            //       {`Sending only to ${messageDestination.username}`}
            //       <IconButton
            //         // variant="contained"
            //         color="error"
            //         size="small"
            //         onClick={() => handleResetDestination()}
            //       >
            //         <CancelIcon />
            //       </IconButton>
            //     </>
            //   ) : null
            // }
          />
          <ColorButton
            className="send-button"
            variant="contained"
            size="small"
            endIcon={<SendIcon />}
            type="submit"
            onClick={handleSendMessageClick}
          >
            send
          </ColorButton>
        </div>
      </form>
    </div>
  );
}
