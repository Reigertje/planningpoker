import React from "react";
import Typography from "@mui/material/Typography";

import JoinOrCreate from "./JoinOrCreate";

import { ReactComponent as LogoSvg } from "assets/logo.svg";

const Home = () => {
  return (
    <>
      <div className="planning-poker-home">
        <LogoSvg className="planning-poker-logo" height="150px" />
        <div className="planning-poker-title">
          <Typography variant="h2">Planning Pawker</Typography>
        </div>
        <Typography variant="subtitle1">Purrfect Planning Poker</Typography>
      </div>
      <JoinOrCreate />
    </>
  );
};

export default Home;
