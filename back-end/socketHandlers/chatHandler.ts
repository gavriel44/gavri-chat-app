import rooms from "../db/rooms";
import RoomManager from "../services/roomService";
import { IIo, ISocket } from "../types";
import assertUnreachable from "../utils/help";
import toNewMessage from "../utils/toNewMessage";

export default function chatHandler(socket: ISocket, io: IIo) {
  const myRoomManager = new RoomManager(socket, "1");

  socket.on("disconnecting", () => {
    // eslint-disable-next-line no-console
    console.log("disconnecting");
    const roomBeingLeft = myRoomManager.currentRoomName;
    myRoomManager.removeUserFromRoom();
    socket.to(roomBeingLeft).emit("updateUsersInRoom", rooms[roomBeingLeft]);
  });

  socket.on("join-room", (username, roomToEnter) => {
    socket.join(roomToEnter);
    socket
      .to(roomToEnter)
      .emit("receiveMessage", { type: "EnterRoomMessage", username });
    myRoomManager.userName = username;
    myRoomManager.addUserToRoom(roomToEnter);
    io.to(roomToEnter).emit("updateUsersInRoom", myRoomManager.getMyRoom());
  });

  socket.on("sendMessage", (message, cb) => {
    const newMessage = toNewMessage(message);
    switch (newMessage.type) {
      case "PublicMessage":
        try {
          socket
            .to(myRoomManager.currentRoomName)
            .emit("receiveMessage", newMessage);

          cb();
        } catch (error) {
          if (error instanceof Error) {
            cb(error);
          }
        }
        break;

      case "PrivateMessage":
        try {
          io.to(newMessage.destination.id).emit("receiveMessage", newMessage);
          cb();
        } catch (error) {
          if (error instanceof Error) {
            cb(error);
          }
        }
        break;
      default:
        assertUnreachable(newMessage);
    }
  });
}
