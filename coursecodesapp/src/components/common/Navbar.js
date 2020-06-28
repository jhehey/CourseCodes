import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, CssBaseline, Toolbar, Typography, Link } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Logout } from './';

const useStyles = makeStyles((theme) => ({
	'@global': {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: 'none',
		},
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: 'wrap',
	},
	toolbarTitle: {
		textAlign: 'left',
		flexGrow: 1,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}));

export const Navbar = ({ routes, signedIn }) => {
	const classes = useStyles();

	return (
		<>
			<CssBaseline />
			<AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
						CourseCodes
					</Typography>
					<nav>
						{routes
							.filter((route) => route.isLink)
							.map(({ path, value }, key) => (
								<Link key={key} variant="button" color="textPrimary" href={path} className={classes.link}>
									{value}
								</Link>
							))}
					</nav>
					{signedIn ? (
						<Logout className={classes.link} />
					) : (
						<>
							<Button href="/signin" color="primary" variant="outlined" className={classes.link}>
								Sign In
							</Button>
							<Button href="/signup" color="primary" variant="contained" className={classes.link}>
								Sign Up
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
		</>
	);
};
