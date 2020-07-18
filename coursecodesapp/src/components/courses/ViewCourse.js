import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions } from '../../redux/actions';
import { ViewJoinCode } from './ViewJoinCode';
import { Role } from '../../helpers';
import { Container, Grid, Typography, Divider } from '@material-ui/core';
import { toDateString } from '../../helpers';

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
			<Container maxWidth="md">
				<Typography variant="h4" style={{ color: '#37474f', padding: '5px', margin: '5px' }}>
					Course Information
				</Typography>
				<Divider variant="fullWidth" style={{ padding: '7px' }} />
				<Grid container spacing={5}>
					<Grid container item xs={12} direction="column" spacing={2}>
						<Grid item>
							<Typography variant="caption">Course Name</Typography>
							<Typography variant="h5">{course?.courseName}</Typography>
						</Grid>
						<Grid item>
							<Typography variant="caption">Term</Typography>
							<Typography variant="h5">{course?.term}</Typography>
						</Grid>
						<Grid item>
							<Typography variant="caption">Section</Typography>
							<Typography variant="h5">{course?.section}</Typography>{' '}
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</Grid>
	);
};
