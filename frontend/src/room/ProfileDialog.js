import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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
