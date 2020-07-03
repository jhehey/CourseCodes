import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions } from '../redux/actions';

export const useGetCourses = (query = {}) => {
	const dispatch = useDispatch();
	const courses = useSelector((state) => state.course?.courses);

	// get instructor's courses, dispatch only when courses is undefined
	useEffect(() => {
		if (!courses) {
			dispatch(courseActions.getCourses(query));
		}
	}, [dispatch, query, courses]);
	return courses;
};
