import React, { ReactElement } from "react";
import ChatWindow from "./ChatWindow";
import "./styles.css";

interface Props {
  url?: string;
}

export default function ChatModule({ url }: Props): ReactElement {
  return (
    <div>
      <ChatWindow url={url} />
    </div>
  );
}
