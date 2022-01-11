import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import ChatModule from "./components/ChatModule";
import { useAppDispatch } from "./hooks/redux";
import { setRoom, setUsername } from "./features/chatContextSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const username = prompt("enter your name") || "anonymous";
    const room = prompt("enter room") || "1";
    dispatch((dispatch) => {
      dispatch(setUsername(username));
      dispatch(setRoom(room));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <CssBaseline />
      <ChatModule />
    </div>
  );
}

export default App;
