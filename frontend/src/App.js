import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import socketIOClient from "socket.io-client";
import SwitchButton from "@mui/material/Switch";

import Home from "./home/Home";
import Room from "./room/Room";
import Snowflakes from "seasonal/snowflakes/snowflakes";
import { useSnackbar } from "notistack";

import "./App.css";

export const AppContext = React.createContext();

const App = () => {
  const [client, setClient] = useState(null);
  const [showSnowflakes, setShowSnowflakes] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const client = socketIOClient();
    client.on("connected", () => {
      setClient(client);
    });
  }, []);

  const dispatchError = message => {
    enqueueSnackbar(message, {
      autoHideDuration: 2000,
      variant: "error",
      anchorOrigin: {
        horizontal: "center",
        vertical: "bottom"
      }
    });
  };

  const switchButtonLabel = { inputProps: { 'aria-label': 'Xmas mode' } };

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ client, dispatchError }}>
        {client && (
          <Container maxWidth="lg" className="app-container">
            <Snowflakes showSnowflakes={showSnowflakes} />
            <Grid container spacing={2}>
              <Grid xs={12}>
                <SwitchButton {...switchButtonLabel} showSnowflakes color="default" />
              </Grid>
              <Grid>
                <Routes>
                  <Route path="/:roomId" element={<Room />} />
                  <Route path="/" element={<Home />} />
                </Routes>
              </Grid>
            </Grid>
          </Container>
        )}
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
