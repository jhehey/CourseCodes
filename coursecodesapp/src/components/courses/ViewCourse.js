import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions } from '../../redux/actions';
import { Grid } from '@material-ui/core';
import { ViewJoinCode } from './ViewJoinCode';
import { Role } from '../../helpers';

export const ViewCourse = () => {
	// dispatch request to get course info
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const course = useSelector((state) => state.course?.course);

	useEffect(() => {
		dispatch(courseActions.getCourse(courseId));
	}, [dispatch, courseId]);

	const signedAccount = useSelector((state) => state.account?.signedAccount);
	const isInstructor = signedAccount.accountRole === Role.Instructor;
	console.log(course);

	return (
		<Grid container>
			{isInstructor && <ViewJoinCode />}
			<Grid item xs={12}>
				<h1>View Course</h1>
				<h1>Course Name: {course?.courseName}</h1>
				<h3>Date Created: {course?.dateCreated}</h3>
			</Grid>
		</Grid>
	);
};
