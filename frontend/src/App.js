import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import { socket } from './socket';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import Home from "./home/Home";
import Room from "./room/Room";
import Snowflakes from "seasonal/snowflakes/snowflakes";
import { useSnackbar } from "notistack";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import "./App.css";
import { SvgIcon } from "@mui/material";

export const AppContext = React.createContext();

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [client, setClient] = useState(null);
  const [showSnowflakes, setShowSnowflakes] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const onConnect = () => { setIsConnected(true); setClient(socket); }
    const onDisconnect = () => { setIsConnected(false); }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
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

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ client, dispatchError }}>
        {client && (
            <Grid container spacing={2}>
              <Snowflakes showSnowflakes={showSnowflakes} />
              <Grid xs={12} key="grid-top-bar-navigation" display="flex" justifyContent="right">
              <FormGroup>
                <FormControlLabel control={<Switch checked={showSnowflakes} onChange={() => setShowSnowflakes(!showSnowflakes)} />} label={<SvgIcon component={AcUnitIcon} />} />
              </FormGroup>
              </Grid>
              <Grid
                key="grid-routes"
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Routes>
                  <Route path="/:roomId" element={<Room />} />
                  <Route path="/" element={<Home />} />
                </Routes>
              </Grid>
            </Grid>
        )}
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
