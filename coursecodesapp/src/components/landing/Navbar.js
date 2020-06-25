import React from 'react';
import { AppBar, Button, CssBaseline, Toolbar, Typography, Link } from '@material-ui/core';
import useStyles from "./style";
//import theme from '../../theme';

const Navbar = () => {
	const classes = useStyles();
	return (
		<>
			<CssBaseline />
			<AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography noWrap className={classes.toolbarTitle}>
						Course Codes
					</Typography>
					<nav>
						<Link href="/" className={classes.link}>
							Home
						</Link>
						<Link href="/about"  className={classes.link} >
							About
						</Link>
					</nav>
					<Button href="/signin" color="primary" variant="outlined" className={classes.link}>
						Sign In
					</Button>
					<Button href="/signup" color="primary" variant="contained" className={classes.link}>
						Sign Up
					</Button>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
