import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, Toolbar, Typography, Divider, IconButton, Container } from '@material-ui/core/'
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';
import InStyles from "./InStyle";
import MaterialTableDemo from './CourseTable';
import CreateCourseForm from './CreateCourseForm';

const CourseList = () => {
  const classes = InStyles();
  return (
    <div>
      <CssBaseline />
      <AppBar style={{ background: '#37474f', color:'#eceff1'  }}>
        <Toolbar className={classes.toolbar}>
            <LibraryBooks />
          <Typography component="h1" variant="h6" color="#37474f" noWrap className={classes.title}>
            Courses
          </Typography>
          <IconButton color="inherit">
              <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Typography  variant="h4"  noWrap className={classes.subTitle}>
           All Courses
      </Typography>
      <Divider variant="middle" />
      <Container maxWidth="lg" className={classes.container}>
        <CreateCourseForm />
        <MaterialTableDemo/>
      </Container>
    </div>
  );
};
export default CourseList;