import React, { ReactElement } from "react";
import ChatWindow from "./ChatWindow";

interface Props {}

export default function ChatModule({}: Props): ReactElement {
  return (
    <div>
      <ChatWindow />
    </div>
  );
}
