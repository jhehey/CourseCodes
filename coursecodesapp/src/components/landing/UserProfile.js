import React from 'react';
import useStyles from "./style";
import { Container, Button, Grid, Typography, TextField, MenuItem, InputLabel, Select, Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

export default function UserProfile() {
    const classes = useStyles();
    const [type, gender, setType, setGender] = React.useState('');
    const handleChange = (event) => {
        setType(event.target.value);
        setGender(event.target.value);
      };
  return (
    <React.Fragment>
    <Container maxWidth='md'  className={classes.formControl}>
      <Typography variant="h4" style={{ color: '#37474f', padding: "5px", margin: "5px"}}>
        Profile
      </Typography>
      <Divider variant="fullWidth" style={{ padding: "7px", margin: "7px"}} />
      <Grid container spacing={5}>
      <Grid item xs={6}>
        <Typography variant="h6" className={classes.profcontainer} >
            User Information
        </Typography>
          <TextField
            id="firstName"
            name="firstName"
            label="First name"
            defaultValue="Sophia Riziel"
            fullWidth
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            defaultValue="De Guzman"
            fullWidth
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            defaultValue="sophiariziel@gmail.com"
            fullWidth
          />
          <TextField
            required
            id="passwd"
            name="passwd"
            label="Password"
            defaultValue="sophiariziel"
            type="password"
            fullWidth
          />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" className={classes.profcontainer}>
            Educational Information
        </Typography>
          <TextField
            id="uni"
            name="uni"
            label="University"
            defaultValue="Mapua University"
            fullWidth
          />
            <InputLabel id="type">Type</InputLabel>
            <Select
            id="type"
            name="type"
            value={type}
            onChange={handleChange}
            fullWidth
            >
            <MenuItem>Faculty</MenuItem>
            <MenuItem>Student</MenuItem>
            </Select>
        <TextField
            id="idNum"
            name="idNum"
            label="ID"
            defaultValue="2015108138"
            fullWidth
          />
          <TextField
            id="dept"
            name="dept"
            label="Department"
            defaultValue="EECE"
            fullWidth
          />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" className={classes.profcontainer}>
            Additional Information
        </Typography>
          <TextField
            id="addr"
            name="addr"
            label="Address"
            defaultValue="APT.C Unicorn Village Black :)"
            fullWidth
          />
            <InputLabel id="gender">Gender</InputLabel>
            <Select
            id="gender"
            name="gender"
            value={gender}
            onChange={handleChange}
            fullWidth
            >
            <MenuItem>Male</MenuItem>
            <MenuItem>Female</MenuItem>
            </Select>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </form>
          <TextField
            id="contactNum"
            name="contactNum"
            label="Contact Number"
            defaultValue="09954412547"
            fullWidth
          />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" component="span" margin='5px' startIcon={<EditIcon />}>
          Update Profile
        </Button>
      </Grid>
      </Grid>
    </Container>
    </React.Fragment>
  );
}