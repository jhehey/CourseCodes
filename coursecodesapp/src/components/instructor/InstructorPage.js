import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Box, AppBar, Toolbar, Typography, Divider, IconButton, Container,
        Grid, Paper } from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InStyles from "./InStyle";
import CourseList from './CourseList';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LibraryBooks from '@material-ui/icons/LibraryBooks';


const InstructorPage = () => {
  const classes = InStyles();
  const itemsList = [
    { text: 'Dashboard', icon: <DashboardIcon/> },
    { text: 'Account', icon: <AccountCircle/> },
    { text: 'Courses', icon: <LibraryBooks/> },
    { text: 'Sign Out', icon: <ExitToApp/> },
  ];
  
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="#37474f" noWrap className={classes.title}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open} >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
           {itemsList.map((item, index) => {
             const { text, icon } = item;
             return (
               <ListItem button key={text}>
                 {icon && <ListItemIcon>{icon}</ListItemIcon>}
                 <ListItemText primary={text} />
               </ListItem>
             );
           })} 
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
              <Paper elevation={5} className={fixedHeightPaper}>
              <Box boxShadow={10} className={classes.header}>Course List</Box>
			  <CourseList />
              </Paper>

          </Grid>
        </Container>
      </main>
    </div>
  );
};
export default InstructorPage;
