import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import Grow from "@mui/material/Grow";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} TransitionComponent={Grow}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
