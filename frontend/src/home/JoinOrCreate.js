import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { AppContext } from "App";

import { DEFAULT_OPTIONS } from "options";

const JOIN = "JOIN";
const CREATE = "CREATE";

const JoinOrCreate = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [selectedTab, setSelectedTab] = useState(JOIN);
  const { client } = useContext(AppContext);

  const onJoin = roomId => {
    navigate(`/${roomId}`);
  };

  const onCreate = () => {
    client.emit("create", DEFAULT_OPTIONS, roomId => {
      navigate(`/${roomId}`);
    });
  };

  return (
    <Grid
      container
      item
      xs={12}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          indicatorColor="primary"
          style={{ marginBottom: "16px" }}
        >
          <Tab label="Join room" value={JOIN} />
          <Tab label="New room" value={CREATE} />
        </Tabs>
      </Grid>
      {selectedTab === JOIN && (
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Room ID"
            variant="outlined"
            style={{ marginBottom: "12px" }}
            value={roomId}
            onChange={e => setRoomId(e.target.value.toUpperCase())}
          />
        </Grid>
      )}
      <Grid item>
        {selectedTab === JOIN ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => onJoin(roomId)}
          >
            Join room
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={onCreate}>
            Create room
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default JoinOrCreate;
