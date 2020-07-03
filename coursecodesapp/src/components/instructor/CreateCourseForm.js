import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle  } from '@material-ui/core/';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function CreateCourseForm() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='contained'  style={{ background: '#37474f', color:'#eceff1', padding: "10px"  }} startIcon={<AddCircleIcon />} onClick={handleClickOpen}>
        Create a Course
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle  style={{ background: '#37474f', color:'#eceff1', padding: "10px"  }} id="form-dialog-title">Create a Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="name"
            label="Course Name"
            type="string"
            fullWidth
          />
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="term"
            label="Term"
            type="string"
            fullWidth
          />
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="sec"
            label="Section"
            type="string"
            fullWidth
          />
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="cap"
            label="Capacity"
            type="numeric"
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}