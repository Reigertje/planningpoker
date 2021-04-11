import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const NameDialog = ({ open, handleClose, onChangeName, initialValue }) => {
  const [name, setName] = useState(initialValue || "");

  const handleSubmit = e => {
    e.preventDefault();
    onChangeName(name);
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
            onChange={e => setName(e.target.value)}
            fullWidth
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

export default NameDialog;
