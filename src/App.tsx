import React from "react";
import "./styles/globals.css";
import Home from "./pages/Home";
import ContextProvider from "./store/ContextProvider";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
