import React, { ReactElement } from "react";
import { message } from "../../types";

interface Props {
  message: message;
}

export default function Message({ message }: Props): ReactElement {
  return (
    <div>
      <p>text: {message.text}</p>
    </div>
  );
}
