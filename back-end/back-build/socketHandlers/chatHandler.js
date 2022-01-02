"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const rooms_1 = __importDefault(require("../db/rooms"));
function chatHandler(socket, io) {
    let roomNum = "1";
    socket.on("disconnecting", () => {
        console.log("disconnecting");
        rooms_1.default[roomNum] = rooms_1.default[roomNum].filter((user) => user.id !== socket.id);
        socket.to(roomNum).emit("updateUsersInRoom", rooms_1.default[roomNum]);
    });
    socket.on("sendMessage", (message, cb) => {
        switch (message.type) {
            case "EnterRoomMessage":
                roomNum = String(message.roomNum);
                socket.join(roomNum);
                socket.to(roomNum).emit("receiveMessage", message);
                rooms_1.default[roomNum].push({ id: socket.id, username: message.username });
                io.to(roomNum).emit("updateUsersInRoom", rooms_1.default[roomNum]);
                break;
            case "message":
                try {
                    const newId = (0, uuid_1.v4)();
                    const newMessage = Object.assign(Object.assign({}, message), { id: newId });
                    socket.to(roomNum).emit("receiveMessage", newMessage);
                    cb(newId);
                }
                catch (error) {
                    console.log(error);
                }
                break;
            case "PrivateMessage":
                console.log(message);
                try {
                    const newId = (0, uuid_1.v4)();
                    const newMessage = Object.assign(Object.assign({}, message), { id: newId });
                    io.to(message.destination.id).emit("receiveMessage", newMessage);
                    cb(newId);
                }
                catch (error) {
                    console.log(error);
                }
            default:
                break;
        }
        console.log(message);
    });
}
exports.default = chatHandler;
