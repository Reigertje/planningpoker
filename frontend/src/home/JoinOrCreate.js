import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import { AppContext } from "App";

import { DEFAULT_OPTIONS } from "options";
import SpacingWithText from "utils/SpacingWithText";

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
      spacing={2}
      xs={12}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid xs={12} spacing={2} display="flex" justifyContent="center">
        <TextField
          id="outlined-basic"
          label="Room ID"
          variant="outlined"
          value={roomId}
          onChange={e => setRoomId(e.target.value.toUpperCase())}
        />
      </Grid>

      <Grid xs={12} spacing={2} display="flex" justifyContent="center">
        <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
            onClick={() => onJoin(roomId)}
          >
            Join room
        </Button>
      </Grid>

      <Grid xs={12} spacing={2} display="flex" justifyContent="center">
        <SpacingWithText text={"or"} />
      </Grid>

      <Grid xs={12} spacing={2} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={onCreate} startIcon={<AddCircleOutlineRoundedIcon />}>
          Create room
        </Button>
      </Grid>
    </Grid>
  );
};

export default JoinOrCreate;
