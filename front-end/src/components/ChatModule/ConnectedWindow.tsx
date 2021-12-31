import React, { ReactElement } from "react";
import { User } from "../../types";
import ConnectedUser from "./ConnectedUser";

interface Props {
  connectedUsers: User[];
  handleSendTo: (user: User) => void;
}

export default function ConnectedWindow({
  connectedUsers,
  handleSendTo,
}: Props): ReactElement {
  return (
    <div className="connected-window">
      {connectedUsers.map((user) => {
        return (
          <ConnectedUser
            key={user.id}
            user={user}
            handleClick={() => {
              console.log(user);

              handleSendTo(user);
            }}
          />
        );
      })}
    </div>
  );
}
