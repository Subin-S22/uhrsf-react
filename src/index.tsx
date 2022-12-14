import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContextProvider from "./store/ContextProvider";
import { ToastContainer, Zoom } from 'react-toastify'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ContextProvider>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      closeOnClick
      pauseOnHover
      hideProgressBar={false}
      limit={3}
      newestOnTop={true}
      transition={Zoom}
    />
  </ContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
