import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import Navbar from "./Components/Navbar";
import { Provider } from "react-redux";
import appStore from "./utilities/appStore";
import { Buffer } from "buffer";
window.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <Navbar />
      <App />
    </BrowserRouter>
  </Provider>
);
