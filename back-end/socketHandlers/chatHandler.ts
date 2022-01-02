import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { v4 as uuidv4 } from "uuid";
import rooms from "../db/rooms";
import {
  ClientToServerEvents,
  Message,
  Room,
  ServerToClientEvents,
} from "../types";

export default function chatHandler(
  socket: Socket,
  io: Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>
) {
  let roomNum = "1";

  socket.on("disconnecting", () => {
    console.log("disconnecting");

    rooms[roomNum] = rooms[roomNum].filter((user) => user.id !== socket.id);
    socket.to(roomNum).emit("updateUsersInRoom", rooms[roomNum]);
  });

  socket.on("sendMessage", (message: Message, cb) => {
    switch (message.type) {
      case "EnterRoomMessage":
        roomNum = String(message.roomNum);
        socket.join(roomNum);
        socket.to(roomNum).emit("receiveMessage", message);
        rooms[roomNum].push({ id: socket.id, username: message.username });
        io.to(roomNum).emit("updateUsersInRoom", rooms[roomNum]);

        break;
      case "message":
        try {
          const newId = uuidv4();

          const newMessage = {
            ...message,
            id: newId,
          };

          socket.to(roomNum).emit("receiveMessage", newMessage);

          cb(newId);
        } catch (error) {
          console.log(error);
        }
        break;

      case "PrivateMessage":
        console.log(message);

        try {
          const newId = uuidv4();

          const newMessage = {
            ...message,
            id: newId,
          };

          io.to(message.destination.id).emit("receiveMessage", newMessage);

          cb(newId);
        } catch (error) {
          console.log(error);
        }

      default:
        break;
    }

    console.log(message);
  });
}
