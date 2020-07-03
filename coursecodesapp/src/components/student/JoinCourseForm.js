import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@material-ui/core/';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function JoinCourseForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" startIcon={<AddCircleIcon />} onClick={handleClickOpen}>
        Join a Course
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle style={{ background: '#37474f', color:'#eceff1', padding: "10px"}} id="form-dialog-title">Join a Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join a course, please enter the course name provided by your host/instructor.
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="name"
            label="Course Name"
            type="string"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}