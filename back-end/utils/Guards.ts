import { CToSMessagesTypes, User } from "../types";

export function isString(string: unknown): string is string {
  if (typeof string === "string") {
    return true;
  }
  return false;
}

export function isType(str: unknown): str is CToSMessagesTypes {
  if (str === "PublicMessage" || str === "PrivateMessage") {
    return true;
  }
  return false;
}

export function isUser(obj: any): obj is User {
  if (
    !obj.username ||
    !isString(obj.username) ||
    !obj.id ||
    !isString(obj.id)
  ) {
    return false;
  }
  return true;
}
