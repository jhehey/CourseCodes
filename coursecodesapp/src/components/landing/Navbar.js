import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

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

const Navbar = () => {
	const classes = useStyles();

	return (
		<>
			<CssBaseline />
			<AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
						Course Codes
					</Typography>
					<nav>
						<Link variant="button" color="textPrimary" href="/" className={classes.link}>
							Home
						</Link>
						<Link variant="button" color="textPrimary" href="/about" className={classes.link}>
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
