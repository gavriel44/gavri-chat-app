import { useEffect } from "react";
import { io } from "socket.io-client";
import { setSocket } from "../features/chatContextSlice";
import { ClientSocket } from "../types";
import { useAppDispatch } from "./redux";

const useSocket = (url?: string): void => {
  // const [socket, setSocket] = useState<ClientSocket>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newSocket: ClientSocket = url ? io(url) : io();
    newSocket.on("connect", () => {
      console.log("connected to socket");
      // setSocket(newSocket);
      dispatch(setSocket(newSocket));
    });

    return () => {
      newSocket.close();
    };
  }, [url]);
};

export default useSocket;
