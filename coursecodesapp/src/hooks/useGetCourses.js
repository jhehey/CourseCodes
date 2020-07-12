/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions } from '../redux/actions';

export const useGetCourses = (query = {}) => {
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.course?.courses);
	const courseCreated = useSelector((state) => state.course?.courseCreated);
	const joinedCourse = useSelector((state) => state.course?.joinedCourse);

	console.log(joinedCourse);
	if (joinedCourse) {
		dispatch(courseActions.getCourses(query));
		dispatch(courseActions.enableJoin());
	}

	useEffect(() => {
		console.log('Get Courses');
		dispatch(courseActions.getCourses(query));
	}, [courseCreated]);
	return courses;
};
