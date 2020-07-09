import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, Toolbar, Typography, Divider, IconButton, Container } from '@material-ui/core/';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';
import { CoursesTable } from './CoursesTable';
import CreateCourseForm from './CreateCourseForm';
import { useSelector } from 'react-redux';
import { Role } from '../../helpers';
import { JoinCourse } from './';

import { useStyles } from './useStyles';

export const CourseList = () => {
	// TODO: if student, join course form
	// TODO: if instructor create course form
	const { signedAccount } = useSelector((state) => state.account);
	const isStudent = signedAccount.accountRole === Role.Student;
	const isInstructor = signedAccount.accountRole === Role.Instructor;

	const classes = useStyles();
	return (
		<div>
			<CssBaseline />
			<AppBar style={{ background: '#37474f', color: '#eceff1' }}>
				<Toolbar className={classes.toolbar}>
					<LibraryBooks />
					<Typography component="h1" variant="h6" noWrap className={classes.title}>
						Courses
					</Typography>
					<IconButton color="inherit">
						<HomeIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Container maxWidth="lg" className={classes.container}>
				{isInstructor && <CreateCourseForm />}
				{isStudent && <JoinCourse />}
				<CoursesTable />
			</Container>
		</div>
	);
};
