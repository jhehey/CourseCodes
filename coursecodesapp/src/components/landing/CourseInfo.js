import React from 'react';
import useStyles from "./style";
import { Container, Button, Grid, Typography, TextField, Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

export default function CourseInfo() {
    const classes = useStyles();
  return (
    <React.Fragment>
    <Container maxWidth='md'  className={classes.formControl}>
      <Typography variant="h4" style={{ color: '#37474f', padding: "5px", margin: "5px"}}>
        Course Information
      </Typography>
      <Divider variant="fullWidth" style={{ padding: "7px", margin: "7px"}} />
      <Grid container spacing={5}>
      <Grid item xs={6}>
        <Typography variant="h6" className={classes.profcontainer} >
            Information
        </Typography>
          <TextField
            id="crsCode"
            name="crsCode"
            label="Course Code"
            defaultValue="CPE103L"
            fullWidth
          />
          <TextField
            id="crsName"
            name="crsName"
            label="Course Name"
            defaultValue="Object Oriented Programming"
            fullWidth
          />
          <TextField
            id="preReq"
            name="preReq"
            label="Pre-requisite"
            defaultValue="CPE102L"
            fullWidth
          />
          <TextField
            id="instructor"
            name="instructor"
            label="Instructor"
            defaultValue="Analyn Yumang"
            fullWidth
          />
          <TextField
            id="term"
            name="term"
            label="Term"
            defaultValue="4Q SY 2019-2020"
            fullWidth
          />
          <TextField
            id="section"
            name="section"
            label="Section"
            defaultValue="B1"
            fullWidth
          />
          <form className={classes.container} noValidate>
            <TextField
              id="startDate"
              label="Start Date"
              type="date"
              defaultValue="2020-04-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </form>
          <form className={classes.container} noValidate>
            <TextField
              id="endDate"
              label="End Date"
              type="date"
              defaultValue="2020-08-12"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </form>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" className={classes.profcontainer}>
            Schedule
        </Typography>
          <TextField
            id="day"
            name="day"
            label="Day"
            defaultValue="Wednesday, Thursday"
            fullWidth
          />
         <form className={classes.container} noValidate>
            <TextField
                id="startTime"
                label="Start Time"
                type="time"
                defaultValue="07:00"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                fullWidth
            />
        </form>
        <form className={classes.container} noValidate>
            <TextField
                id="endTime"
                label="End Time"
                type="time"
                defaultValue="12:00"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                fullWidth
            />
        </form>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" component="span" margin='5px' startIcon={<EditIcon />}>
          Edit Information
        </Button>
      </Grid>
      </Grid>
    </Container>
    </React.Fragment>
  );
}