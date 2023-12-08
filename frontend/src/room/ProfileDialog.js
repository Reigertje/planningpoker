import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const ProfileDialog = ({
  open,
  handleClose,
  onChangeProfile,
  initialName,
  initialIsSpectator,
}) => {
  const [name, setName] = useState(initialName || "");
  const [isSpectator, setIsSpectator] = useState(initialIsSpectator || false);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  useEffect(() => {
    setIsSpectator(initialIsSpectator);
  }, [initialIsSpectator]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangeProfile(name, isSpectator);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Enter name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <FormControlLabel
            control={
              <Switch
                checked={isSpectator}
                onChange={(e) => setIsSpectator(e.target.checked)}
              />
            }
            label="Spectator mode"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProfileDialog;
