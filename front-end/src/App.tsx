import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import ChatModule from "./components/ChatModule";
import UsernameContext from "./components/UsernameContext";

function App() {
  const [setup, setSetup] = useState({ username: "", room: "1" });
  useEffect(() => {
    const username = prompt("enter your name") || "anonymous";
    const room = prompt("enter room") || "1";
    setSetup({ username, room });
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      <UsernameContext.Provider value={setup}>
        <ChatModule />
      </UsernameContext.Provider>
    </div>
  );
}

export default App;
