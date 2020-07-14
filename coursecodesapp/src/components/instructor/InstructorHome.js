import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core/';
import { pageRoutes } from '../../helpers';
import { RouteComponents } from '../common';
import { AppBarDrawer } from '../navigation';
import { useStyles } from './useStyles';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const InstructorHome = () => {
	const classes = useStyles();

	const courseToView = useSelector((state) => state.course?.courseToView);
	const courseId = courseToView?.id;
	// console.log('INSTRUCTOR HOME');
	// console.log(courseToView);

	const instructorLinks = [
		{ text: 'Dashboard', icon: <DashboardIcon />, href: '/' },
		{ text: 'Account', icon: <AccountCircle />, href: '/profile' },
		{ text: 'Courses', icon: <LibraryBooks />, href: '/courses' },
		{ text: 'Sign Out', icon: <ExitToApp />, href: '/signout' },
	];

	const courseLinks = [
		{ text: 'Back', icon: <ArrowBackIcon />, href: '/courses' },
		{ text: 'Home', icon: <HomeIcon />, href: `/courses/${courseId}` },
		{ text: 'Students', icon: <GroupIcon />, href: `/courses/${courseId}/students` },
		{ text: 'Assignments', icon: <AssignmentIcon />, href: `/courses/${courseId}/problems` },
		{ text: 'Solutions', icon: <PlaylistAddCheckIcon />, href: `/courses/${courseId}/solutions` },
	];

	const location = useLocation();
	const [controller, param] = location.pathname.slice(1).split('/');
	const itemsList = controller === 'courses' && param ? courseLinks : instructorLinks;
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBarDrawer itemsList={itemsList} />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<RouteComponents routes={pageRoutes.instructor} />
				</Container>
			</main>
		</div>
	);
};
