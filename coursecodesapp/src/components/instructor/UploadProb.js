import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadProb() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*,.jpg, .pdf, .doc"
        className={classes.input}
        id="upload-file"
        multiple
        type="file"
      />
      <label htmlFor="upload-file">
        <Button variant="contained" color="primary" component="span" startIcon={<PublishIcon />}>
          Upload a Topic
        </Button>
      </label>
    </div>
  );
}