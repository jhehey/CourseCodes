import React from 'react';
import { Grid, Button, Link } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useGetCourses } from '../../hooks';
import { Role } from '../../helpers';
import { JoinCourse } from '../common';

export const Courses = () => {
	const { signedAccount } = useSelector((state) => state.account);

	// get courses based on type of account
	const isStudent = signedAccount.accountRole === Role.Student;
	const isInstructor = signedAccount.accountRole === Role.Instructor;
	const query = isInstructor ? { instructorId: signedAccount.id } : isStudent ? { studentId: signedAccount.id } : null;
	const courses = useGetCourses(query);

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
					{isInstructor && (
						<Button href="/courses/create" variant="contained" color="primary">
							Create Course
						</Button>
					)}
					{isStudent && <JoinCourse />}
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
