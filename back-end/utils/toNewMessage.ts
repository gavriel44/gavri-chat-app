import { ClientToServerMessages, CToSMessagesTypes, User } from "../types";
import { isString, isType, isUser } from "./Guards";
import assertUnreachable from "./help";

export default function toNewMessage(object: any): ClientToServerMessages {
  const messageType: CToSMessagesTypes = parseType(object.type);

  const newBaseMessage = {
    id: parseString(object.id),
    text: parseString(object.text),
    username: parseString(object.username),
  };

  let newMessage: ClientToServerMessages;

  switch (messageType) {
    case "PublicMessage":
      newMessage = {
        ...newBaseMessage,
        type: messageType,
      };
      break;
    case "PrivateMessage":
      newMessage = {
        ...newBaseMessage,
        type: messageType,
        destination: parseDestination(object.destination),
      };
      break;
    default:
      assertUnreachable(messageType);
  }

  return newMessage;
}

function parseDestination(des: unknown): User {
  if (!des || !isUser(des)) {
    throw new Error("missing or invalid destination user");
  }
  return des;
}

function parseType(tpe: unknown): CToSMessagesTypes {
  if (!tpe || !isType(tpe)) {
    throw new Error("message type missing or invalid");
  }
  return tpe;
}

function parseString(text: unknown): string {
  if (!text || !isString(text)) {
    throw new Error("missing or invalid text format");
  }
  return text;
}
