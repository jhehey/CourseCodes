import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions } from '../../redux/actions';
import { Grid, Button } from '@material-ui/core';

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

	return (
		<Grid container>
			<Grid item xs={3}>
				<Grid item xs={12}>
					<Button href="#" variant="contained" color="primary">
						View Students
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button href="#" variant="contained" color="primary">
						Create Topic
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={9}>
				<h1>Title: {course?.title}</h1>
				<h3>Description: {course?.description}</h3>
				<h3>Date Created: {course?.dateCreated}</h3>
				<h1>Topics List</h1>
			</Grid>
		</Grid>
	);
};
