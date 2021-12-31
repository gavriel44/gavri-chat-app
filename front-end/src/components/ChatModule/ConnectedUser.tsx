import { Button, IconButton } from "@mui/material";
import React, { ReactElement, useContext } from "react";
import { User } from "../../types";
import UsernameContext from "../UsernameContext";
import ChatIcon from "@mui/icons-material/Chat";
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
    <div className="connected-user">
      <span className="connected-user-name">{user.username}</span>

      {username === user.username ? null : (
        <IconButton size="medium" color="secondary" onClick={handleClick}>
          <ChatIcon />
        </IconButton>
      )}
    </div>
  );
}
