import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { v4 as uuidv4 } from "uuid";
import rooms from "../db/rooms";
import roomService from "../services/roomService";
import { ClientToServerEvents, Message, ServerToClientEvents } from "../types";

export default function chatHandler(
  socket: Socket,
  io: Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>
) {
  let roomName = "1";

  socket.on("disconnecting", () => {
    console.log("disconnecting");

    roomService.removeUserFromRoom(roomName, socket.id);
    // rooms[roomName] = rooms[roomName].filter((user) => user.id !== socket.id);
    socket.to(roomName).emit("updateUsersInRoom", rooms[roomName]);
  });

  socket.on("join-room", (username: string, roomToEnter) => {
    socket.join(roomToEnter);
    socket
      .to(roomToEnter)
      .emit("receiveMessage", { type: "EnterRoomMessage", username });
    roomService.addUserToRoom(roomToEnter, {
      id: socket.id,
      username: username,
    });
    io.to(roomToEnter).emit(
      "updateUsersInRoom",
      roomService.getRoom(roomToEnter)
    );
  });

  socket.on("sendMessage", (message: Message, cb) => {
    switch (message.type) {
      case "PublicMessage":
        try {
          socket.to(roomName).emit("receiveMessage", message);

          cb();
        } catch (error) {
          cb(error);
          console.log(error);
        }
        break;

      case "PrivateMessage":
        try {
          io.to(message.destination.id).emit("receiveMessage", message);
          cb();
        } catch (error) {
          cb(error);
          console.log(error);
        }
        break;
      default:
        assertUnreachable(message);
        break;
    }

    console.log(message);
  });
}

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}
