import { ReactElement, useEffect } from "react";
import MessagesBlock from "./MessagesBlock";
import {
  isMessageFromServer,
  ReceivableMessage,
  SendableMessage,
} from "../../types";
import ChatInput from "./ChatInput";
import useSocket from "../../hooks/useSocket";
import ConnectedWindow from "./ConnectedWindow";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addMessage, updateMessageStatus } from "../../features/messagesSlice";
import {
  selectConnectedUsers,
  setConnectedUsers,
} from "../../features/connectedUsersSlice";
import { selectChatContext } from "../../features/chatContextSlice";

interface Props {
  url?: string;
}

export default function ChatWindow({ url }: Props): ReactElement {
  const socket = useSocket(url);
  const { username, room } = useAppSelector(selectChatContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof socket === "undefined") {
      return console.log("trying to connect");
    }

    const messagesListener = (message: ReceivableMessage): void => {
      if (!isMessageFromServer(message)) {
        throw new Error(" missing or invalid message format");
      }
      dispatch(addMessage(message));
    };

    socket.on("receiveMessage", messagesListener);
    socket.on("updateUsersInRoom", (usersInRoom) => {
      console.log(usersInRoom);

      dispatch(setConnectedUsers(usersInRoom));
    });

    socket.emit("join-room", username, room);
  }, [socket, room, username, dispatch]);

  return (
    <div className="chat-module">
      <div className="chat-window">
        <MessagesBlock />
        <ChatInput socket={socket} />
      </div>
      <ConnectedWindow />
    </div>
  );
}
