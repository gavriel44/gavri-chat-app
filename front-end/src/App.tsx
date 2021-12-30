import React, { createContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import ChatModule from "./components/ChatModule";
import UsernameContext from "./components/UsernameContext";

function App() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const name = prompt("enter your name") || "anonymous";
    setUsername(name);
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      <UsernameContext.Provider value={username}>
        <ChatModule />
      </UsernameContext.Provider>
    </div>
  );
}

export default App;
