import { Button } from "@mui/material";
import React, { ReactElement, useContext } from "react";
import { User } from "../../types";
import UsernameContext from "../UsernameContext";

interface Props {
  user: User;
  handleClick: () => void;
}

export default function ConnectedUser({
  user,
  handleClick,
}: Props): ReactElement {
  const { username } = useContext(UsernameContext);
  return (
    <div>
      <span>name: {user.username}</span>

      {username === user.username ? null : (
        <Button onClick={handleClick}>Send message</Button>
      )}
    </div>
  );
}
