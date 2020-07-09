import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions } from '../../redux/actions';
import { Grid, Button, Link } from '@material-ui/core';
import { useGetProblems } from '../../hooks';
import { ViewJoinCode } from './ViewJoinCode';
import { Role } from '../../helpers';
import { Problems } from '../problems';

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
	// const problems = useGetProblems({ courseId });
	// const problemList = problems?.map((problem) => (
	// 	<React.Fragment key={problem.id}>
	// 		<Link href={`/problems/${problem.id}`} variant="h4">
	// 			{problem.title}
	// 		</Link>
	// 		<h4>{problem.statement}</h4>
	// 	</React.Fragment>
	// ));

	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const isStudent = signedAccount.accountRole === Role.Student;
	const isInstructor = signedAccount.accountRole === Role.Instructor;
	console.log(signedAccount, isStudent, isInstructor);

	return (
		<Grid container>
			{isInstructor && <ViewJoinCode />}
			<Grid item xs={12}>
				<h1>View Course</h1>
				<h1>Course Name: {course?.courseName}</h1>
				<h3>Date Created: {course?.dateCreated}</h3>
				{/* {problemList} */}
			</Grid>
		</Grid>
	);
};
