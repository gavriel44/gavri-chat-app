import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import ChatModule from "./components/ChatModule";

function App() {
  return (
    <div className="App">
      <CssBaseline />

      <ChatModule />
    </div>
  );
}

export default App;
