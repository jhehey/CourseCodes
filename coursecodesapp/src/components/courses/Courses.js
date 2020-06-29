import React, { useEffect } from 'react';
import { Grid, Button, Link } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions } from '../../redux/actions';

export const Courses = () => {
	const dispatch = useDispatch();
	const signedInstructor = useSelector((state) => state.instructor?.signedInstructor);
	const courses = useSelector((state) => state.course?.courses);

	// get instructor's courses, dispatch only when courses is undefined
	useEffect(() => {
		if (!courses) {
			dispatch(courseActions.getCoursesByInstructorId(signedInstructor?.id));
		}
	}, [dispatch, signedInstructor, courses]);

	const courseList = courses?.map((course) => (
		<React.Fragment key={course.id}>
			<Link href={`/courses/${course.id}`} variant="h4">
				{course.title}
			</Link>
			<h4>{course.description}</h4>
		</React.Fragment>
	));

	return (
		<Grid container>
			<Grid item xs={3}>
				<Grid item xs={12}>
					<Button href="/courses/create" variant="contained" color="primary">
						Create Course
					</Button>
				</Grid>
				<Grid item xs={12}>
					<h1>Course 2</h1>
				</Grid>
			</Grid>
			<Grid item xs={9}>
				<Grid item xs={12}>
					{courseList}
					<h1>Course List</h1>
				</Grid>
			</Grid>
		</Grid>
	);
};
