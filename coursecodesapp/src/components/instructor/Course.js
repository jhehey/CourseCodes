import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link, List, ListItem, ListItemIcon, ListItemText, Drawer, AppBar, Toolbar, Divider,
          IconButton, Container,} from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InStyles from "./InStyle";
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import TopicList from "./TopicList";
import UploadProb from './UploadProb';


const InstructorPage = () => {
  const classes = InStyles();
  const itemsList = [
    { text: 'Home', icon: <HomeIcon/> },
    { text: 'Topics', icon: <LibraryBooks/> },
    { text: 'Students', icon: <GroupIcon/> },
    { text: 'Assignments', icon: <AssignmentIcon/> },
    { text: 'Solution', icon: <PlaylistAddCheckIcon/> }
  ];
  
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  

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
          <Link component="h1" variant="h6" color="#37474f" noWrap className={classes.title}>
            COE 113L
          </Link>
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
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <UploadProb />
           <TopicList/>
        </Container>
      </main>
    </div>
  );
};
export default InstructorPage;
