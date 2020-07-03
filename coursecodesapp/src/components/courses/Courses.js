import React from 'react';
import { Grid, Button, Link } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useGetCourses } from '../../hooks';

export const Courses = () => {
	const instructor = useSelector((state) => state.account?.signedAccount);
	const courses = useGetCourses({ instructorId: instructor.id });

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
					<h1>Course List</h1>
					{courseList}
				</Grid>
			</Grid>
		</Grid>
	);
};
