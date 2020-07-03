import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions } from '../../redux/actions';
import { Grid, Button, Link } from '@material-ui/core';
import { useGetProblems } from '../../hooks';
import { ViewJoinCode } from '../common/ViewJoinCode';
import { Role } from '../../helpers';

export const ViewCourse = () => {
	// dispatch request to get course info
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const course = useSelector((state) => state.course?.course);

	useEffect(() => {
		if (!course) {
			dispatch(courseActions.getCourse(courseId));
		}
	}, [dispatch, courseId, course]);

	// get problems for this course
	const problems = useGetProblems({ courseId });
	const problemList = problems?.map((problem) => (
		<React.Fragment key={problem.id}>
			<Link href={`/problems/${problem.id}`} variant="h4">
				{problem.title}
			</Link>
			<h4>{problem.statement}</h4>
		</React.Fragment>
	));

	// TODO: If student, if instructor
	// TODO: Ilagay to sa hooks
	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const isStudent = signedAccount.accountRole === Role.Student;
	const isInstructor = signedAccount.accountRole === Role.Instructor;
	console.log(signedAccount, isStudent, isInstructor);

	return (
		<Grid container>
			{isInstructor && (
				<Grid item xs={3}>
					<Grid item xs={12}>
						<Button href="#" variant="contained" color="primary">
							View Students
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Button href={`/courses/${courseId}/topics/create`} variant="contained" color="primary">
							Create Topic Problems
						</Button>
					</Grid>
					<Grid item xs={12}>
						<ViewJoinCode />
					</Grid>
				</Grid>
			)}
			{isStudent && (
				<Grid item xs={3}>
					<Grid item xs={12}>
						<Button href="#" variant="contained" color="primary">
							View Roster
						</Button>
					</Grid>
				</Grid>
			)}
			<Grid item xs={9}>
				<h1>View Course</h1>
				<h1>Title: {course?.title}</h1>
				<h3>Description: {course?.description}</h3>
				<h3>Date Created: {course?.dateCreated}</h3>
				<h1>Topics List</h1>
				<h1>Problems List</h1>
				{problemList}
			</Grid>
		</Grid>
	);
};
