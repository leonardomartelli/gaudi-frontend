import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GaudiMain } from "./pages/gaudi-main/gaudi-main.component";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<GaudiMain></GaudiMain>);
