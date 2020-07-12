import React from 'react';
import clsx from 'clsx';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Drawer,
	AppBar,
	Toolbar,
	Typography,
	Divider,
	IconButton,
	Link,
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useStyles } from './useStyles';
import { useSelector } from 'react-redux';

export const AppBarDrawer = ({ itemsList = [] }) => {
	const classes = useStyles();

	const [open, setOpen] = React.useState(true);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const courseToView = useSelector((state) => state.course?.courseToView);

	return (
		<>
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
					<Typography component="h1" variant="h6" noWrap className={classes.title}>
						Dashboard{courseToView && ` - ${courseToView.courseName}`}
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					{itemsList.map(({ text, icon, href }, index) => {
						return (
							<Link href={href} color="inherit" key={text}>
								<ListItem button>
									{icon && <ListItemIcon>{icon}</ListItemIcon>}
									<ListItemText primary={text} />
								</ListItem>
							</Link>
						);
					})}
				</List>
				<Divider />
			</Drawer>
		</>
	);
};
