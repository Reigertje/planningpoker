import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import SeasonComponent from "season_controller";
import AppRoutes from "app_routes";

const Root = ({ client }) => {
  if (!client) {
    return <></>;
  }

  return (
      <Grid container spacing={2}>
        <Grid xs={12} key="grid-top-bar-navigation" display="flex" justifyContent="right">
          <SeasonComponent season={"winter"} />
        </Grid>

        <Grid
          key="grid-routes"
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center">
            <AppRoutes />
        </Grid>
      </Grid>
  );
}

export default Root;