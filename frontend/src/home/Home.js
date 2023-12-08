import React from "react";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';

import JoinOrCreate from "./JoinOrCreate";

import { ReactComponent as LogoSvg } from "assets/logo.svg";

const Home = () => {
  return (
    <Grid container spacing={2} maxHeight={200}>
      <Grid xs={12} display="flex" justifyContent="center">
        <LogoSvg className="planning-poker-logo" height="150px" />
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center">
        <Typography variant="h3" fontWeight={500}>Planning Pawker</Typography>
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center">
        <Typography variant="subtitle" fontWeight={400}>Purrfect Planning Poker</Typography>
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center">
        <JoinOrCreate />
      </Grid>
    </Grid>
  );
};

export default Home;
