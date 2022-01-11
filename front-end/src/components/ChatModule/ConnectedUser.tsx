import { IconButton } from "@mui/material";
import React, { ReactElement } from "react";
import { User } from "../../types";
import ChatIcon from "@mui/icons-material/Chat";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectChatContext,
  updateDestination,
} from "../../features/chatContextSlice";
interface Props {
  user: User;
}

export default function ConnectedUser({ user }: Props): ReactElement {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector(selectChatContext);

  const handleClick = () => {
    dispatch(updateDestination(user));
  };
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
