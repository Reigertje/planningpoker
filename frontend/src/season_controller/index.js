import React, { useState } from "react";
import Snowflakes from "./snowflakes";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { IOSSwitch } from "utils/Switches";

const SeasonThemeToggle = ({ displayEffects, setDisplayEffects }) => {
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <IOSSwitch
              sx={{ m: 1 }}
              checked={displayEffects}
              onChange={() => setDisplayEffects(!displayEffects)} />
          }
          label="❄️"
        />
      </FormGroup>
    </>
  );
}

const SeasonThemeWrapper = ({ season }) => {
  const [displayEffects, setDisplayEffects] = useState(false);

  const getSeasonComponent = () => {
    switch (season) {
      case "winter":
        return <Snowflakes displayEffects={displayEffects} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      {getSeasonComponent()}

      <SeasonThemeToggle
        displayEffects={displayEffects}
        setDisplayEffects={setDisplayEffects}
      />
    </>
  );
};

export default SeasonThemeWrapper;