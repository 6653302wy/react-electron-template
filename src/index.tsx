import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/global.css";
import { App } from "./screen/app";
import { GlobalStore } from "./store/globalStore";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <GlobalStore>
      <App />
    </GlobalStore>
  </React.StrictMode>
);
