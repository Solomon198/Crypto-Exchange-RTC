import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ToolBarWidget } from "./widgets/ToolBar/index";

function App() {
  return (
    <div
      className="App"
      style={{ width: "80%", margin: "auto", marginTop: 20 }}
    >
      <ToolBarWidget />
    </div>
  );
}

export default App;
