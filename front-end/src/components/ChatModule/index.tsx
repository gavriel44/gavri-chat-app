import React, { ReactElement } from "react";
import ChatWindow from "./ChatWindow";
import "./styles.css";
interface Props {}

export default function ChatModule({}: Props): ReactElement {
  return (
    <div>
      <ChatWindow />
    </div>
  );
}
