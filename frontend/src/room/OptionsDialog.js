import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

import { OPTION_DECKS } from "options";

const OptionsDialog = ({
  open,
  handleClose,
  onChangeOptions,
  initialValue
}) => {
  const [customOptions, setCustomOptions] = useState(initialValue || "");

  const submitOptions = options => {
    onChangeOptions(options.split(/\s*,\s*/).join(","));
    handleClose();
  };

  const handleSubmit = e => {
    e.preventDefault();
    submitOptions(customOptions);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Change cards</DialogTitle>
        <DialogContent>
          {OPTION_DECKS.map(({ name, options }) => (
            <Card
              key={options}
              style={{ marginBottom: "8px" }}
              variant="outlined"
            >
              <CardActionArea onClick={() => submitOptions(options)}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component="p"
                  >
                    {options.split(",").join(", ")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}

          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                Custom
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                Provide a custom deck as comma separated values:
              </Typography>
              <TextField
                variant="outlined"
                placeholder="e.g. 1,2,3,4"
                margin="dense"
                type="input"
                value={customOptions}
                onChange={e => setCustomOptions(e.target.value)}
                fullWidth
              />
              <CardActions className="options-dialog-actions" disableSpacing>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions></DialogActions>
      </form>
    </Dialog>
  );
};

export default OptionsDialog;
