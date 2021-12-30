import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export default function chatHandler(socket: Socket) {
  let roomNum = "1";

  socket.on("sendMessage", (message, cb) => {
    switch (message.type) {
      case "EnterRoomMessage":
        roomNum = String(message.roomNum);
        socket.join(roomNum);
        socket.to(roomNum).emit("receiveMessage", message);
        break;
      case "message":
        const newId = uuidv4();

        const newMessage = {
          ...message,
          id: newId,
        };

        cb(newId);

        socket.to(roomNum).emit("receiveMessage", newMessage);
        break;
      default:
        break;
    }
    console.log(message);
  });
}
