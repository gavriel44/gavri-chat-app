import React, { ReactElement } from "react";
import ChatWindow from "./ChatWindow";
import "./styles.css";

export default function ChatModule(): ReactElement {
  return (
    <div>
      <ChatWindow />
    </div>
  );
}
