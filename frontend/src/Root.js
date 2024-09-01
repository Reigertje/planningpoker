import React, { useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IOSSwitch } from "utils/Switches";
import Home from "./home/Home";
import Room from "./room/Room";
import Snowflakes from "seasonal/snowflakes/snowflakes";
import Grid from '@mui/material/Unstable_Grid2';
import { Routes, Route } from "react-router-dom";

const Root = ({ client }) => {
  const [showSnowflakes, setShowSnowflakes] = useState(true);

  if (!client) {
    return <></>;
  }

  return (
    <Grid container spacing={2}>
      <Snowflakes showSnowflakes={showSnowflakes} />
      <Grid xs={12} key="grid-top-bar-navigation" display="flex" justifyContent="right">
      <FormGroup>
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} checked={showSnowflakes} onChange={() => setShowSnowflakes(!showSnowflakes)} />}
          label="❄️"
        />
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
  );
}

export default Root;