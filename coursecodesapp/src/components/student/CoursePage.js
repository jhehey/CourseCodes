import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, Toolbar, Typography, Divider, IconButton, Container, Paper, Link, 
        Table, TableBody, TableCell, TableHead, TableRow,  } from '@material-ui/core/'
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';
import studStyles from "./studentStyle";
import JoinCourseForm from './JoinCourseForm';

function createData(id, courseName, type, date) {
  return { id, courseName, type, date };
}

const rows = [
  createData(0, 'COE113L', 'Student', '15 Mar, 2019'),
  createData(1, 'COE113L', 'Student', '15 Mar, 2019'),
  createData(2, 'COE113L', 'Student', '15 Mar, 2019'),
  createData(3, 'COE113L', 'Student', '15 Mar, 2019'),
  createData(4, 'COE113L', 'Student', '15 Mar, 2019'),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function CoursePage() {
  const classes = studStyles();
  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="absolute">
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
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography  variant="h4"  noWrap className={classes.subTitle}>
           All Courses
          </Typography>
        <Divider variant="middle" />
        <Container maxWidth="lg" className={classes.container}>
          <JoinCourseForm />
            <Paper>
              <React.Fragment>
              <Table size="medium" stickyHeader>
                <TableHead >
                  <TableRow>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Enrolled As</TableCell>
                    <TableCell>Date Joined</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell >
                        <Link color="primary" href="#" onClick={preventDefault}>
                          {row.courseName}
                        </Link>
                        </TableCell>
                      <TableCell buttton>{row.type}</TableCell>
                      <TableCell >{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </React.Fragment>
            </Paper>
        </Container>
      </main>
    </div>
  );
}