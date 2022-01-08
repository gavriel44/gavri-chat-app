import { ReceivableMessage } from "./Message";

export const isMessageFromServer = (
  message: any
): message is ReceivableMessage => {
  if (!message || !message?.username) {
    return false;
  }
  return true;
};
