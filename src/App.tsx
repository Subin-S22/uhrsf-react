import React from "react";
import "./styles/globals.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-left"
        newestOnTop={true}
        closeOnClick
        autoClose={2000}
        transition={Zoom}
      />
      <BrowserRouter>
        <Routes>
          <Route index path={"/"} element={<Home />} />
          {/* <Route path={"/locator"} element={<BranchLocator />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
