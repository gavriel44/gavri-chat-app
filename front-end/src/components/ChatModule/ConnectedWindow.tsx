import { ReactElement, useEffect } from "react";
import { selectConnectedUsers } from "../../features/connectedUsersSlice";
import { useAppSelector } from "../../hooks/redux";
import ConnectedUser from "./ConnectedUser";

export default function ConnectedWindow(): ReactElement {
  const connectedUsers = useAppSelector(selectConnectedUsers);
  useEffect(() => {
    console.log("in connected Window", connectedUsers);
  }, [connectedUsers]);
  return (
    <div className="connected-window">
      {connectedUsers.map((user) => {
        return <ConnectedUser key={user.id} user={user} />;
      })}
    </div>
  );
}
