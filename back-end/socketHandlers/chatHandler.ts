import { Server, Socket } from "socket.io";
import rooms from "../db/rooms";
import RoomManager from "../services/roomService";
import { ClientToServerEvents, ISocket, ServerToClientEvents } from "../types";

export default function chatHandler(
  socket: ISocket,
  io: Server<ClientToServerEvents, ServerToClientEvents>
) {
  const myRoomManager = new RoomManager(socket, "1");

  socket.on("disconnecting", () => {
    console.log("disconnecting");
    const roomBeingLeft = myRoomManager.currentRoomName;
    myRoomManager.removeUserFromRoom();
    socket.to(roomBeingLeft).emit("updateUsersInRoom", rooms[roomBeingLeft]);
    // roomService.removeUserFromRoom(roomName, socket.id);
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
    switch (message.type) {
      case "PublicMessage":
        try {
          socket
            .to(myRoomManager.currentRoomName)
            .emit("receiveMessage", message);

          cb();
        } catch (error) {
          if (error instanceof Error) {
            cb(error);
            console.log(error);
          }
        }
        break;

      case "PrivateMessage":
        try {
          io.to(message.destination.id).emit("receiveMessage", message);
          cb();
        } catch (error) {
          if (error instanceof Error) {
            cb(error);
            console.log(error);
          }
        }
        break;
      default:
        assertUnreachable(message);
    }

    console.log(message);
  });
}

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}
