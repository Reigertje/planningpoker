import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { socket } from './socket';
import { useSnackbar } from "notistack";
import Root from "./Root";
import "./App.css";

import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1',
      light: '#3d6bb3',
      dark: '#093170'
    },
    secondary: {
      main: '#000000',
      light: '#333333',
      dark: '#000000'
    },
    snow: {
      main: '#124116',
      light: '#006064',
      dark: '#801313'
    },
  }
});

export const AppContext = React.createContext();

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [client, setClient] = useState(null);
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
        <ThemeProvider theme={theme}>
          <Root client={client} />
        </ThemeProvider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
