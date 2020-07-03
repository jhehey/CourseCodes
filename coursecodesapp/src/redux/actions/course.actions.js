import { courseConstants } from '../constants';
import { alertActions } from './alert.actions';
import { CoursesApi } from '../../api';

const createCourse = (courseToCreate) => {
	const createCourseSuccess = (course) => {
		return { type: courseConstants.CREATE_COURSE_SUCCESS, course };
	};

	return async (dispatch) => {
		const { data: course, success, error } = await CoursesApi.createCourse(courseToCreate);
		if (success) {
			dispatch(createCourseSuccess(course));
			dispatch(alertActions.success({ message: 'You have created a course' }));
		} else {
			const message = (error && error.Title && error.Title[0]) || 'There was an error in processing your request';
			dispatch(alertActions.error({ message }));
		}
	};
};

const getCourse = (courseId) => {
	const getCourseSuccess = (course) => {
		return { type: courseConstants.GET_COURSEBYID_SUCCESS, course };
	};

	return async (dispatch) => {
		const { data: course, success } = await CoursesApi.getCourse(courseId);
		if (success) {
			dispatch(getCourseSuccess(course));
		} else {
			console.error('There was an error getting the course');
		}
	};
};

const getCourses = (query = {}) => {
	const getCoursesSuccess = (courses) => {
		return { type: courseConstants.GET_COURSES_SUCCESS, courses };
	};

	return async (dispatch) => {
		const { data: courses, success } = await CoursesApi.getCourses(query);
		if (success) {
			dispatch(getCoursesSuccess(courses));
		} else {
			console.error('There was a problem getting the courses');
		}
	};
};

export const courseActions = {
	createCourse,
	getCourse,
	getCourses,
};
