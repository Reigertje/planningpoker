import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import socketIOClient from "socket.io-client";

import Home from './home/Home';
import Room from './room/Room';
import { useSnackbar } from 'notistack';

import './App.css';

const AppContext = React.createContext();

const App = () => {
  const [client, setClient] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const client = socketIOClient();
    client.on('connected', () => {
      setClient(client);
    });
  }, []);

  const dispatchError = message => {
    enqueueSnackbar(message, {
      autoHideDuration: 2000,
      variant: 'error',
      anchorOrigin: {
        horizontal: 'center',
        vertical: 'bottom',
      },
    });
  }

  return <AppContext.Provider value={{ client, dispatchError }}>
      {client &&
        <Container maxWidth="lg" className="app-container">
          <Switch>
            <Route path="/:roomId">
              <Room />
            </Route>
            <Route path="/" >
              <Home />
            </Route>
          </Switch>
        </Container>
      }
    </AppContext.Provider>
}

export default function AppWrapper() {
  return <Router>
    <App />;
  </Router>
}

export { AppContext };
