import React, { useState, useContext } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { useHistory } from 'react-router-dom';

import { AppContext } from 'App';

import { DEFAULT_OPTIONS } from 'options';

const JOIN = 'JOIN';
const CREATE = 'CREATE';


const JoinOrCreate = () => {
  const history = useHistory();
  const [roomId, setRoomId] = useState(null);
  const [selectedTab, setSelectedTab] = useState(JOIN);
  const { client } = useContext(AppContext);

  const onJoin = roomId => {
    history.push(`/${roomId}`);
  }

  const onCreate = () => {
    client.emit('create', DEFAULT_OPTIONS, roomId => {
      history.push(`/${roomId}`);
    });
  }

  return <Grid container item xs={12} direction="column" justify="center" alignItems="center">
      <Grid item>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          indicatorColor="primary"
          style={{ marginBottom: '16px'}}
          >
          <Tab label='Join room' value={JOIN} />
          <Tab label='New room' value={CREATE} />
        </Tabs>
      </Grid>
      {selectedTab === JOIN &&
        <Grid item>
          <TextField id="outlined-basic" label="Room ID" variant="outlined" style={{ marginBottom: "12px"}} value={roomId} onChange={e => setRoomId(e.target.value.toUpperCase())}  />
        </Grid>
      }
      <Grid item>
        { selectedTab === JOIN ?
          <Button variant="contained" color="primary" onClick={() => onJoin(roomId)}>
            Join room
          </Button>
          :
          <Button variant="contained" color="primary" onClick={onCreate}>
            Create room
          </Button>
        }
      </Grid>
    </Grid>
}

export default JoinOrCreate;
