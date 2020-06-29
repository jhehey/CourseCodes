import { courseConstants } from '../constants';
import { alertActions } from './alert.actions';
import { CourseApi } from '../../api';

const createCourse = (courseToCreate) => {
	const createCourseSuccess = (course) => {
		return { type: courseConstants.CREATE_COURSE_SUCCESS, course };
	};

	return async (dispatch) => {
		const { data: course, success } = await CourseApi.createCourse(courseToCreate);
		if (success) {
			dispatch(createCourseSuccess(course));
			dispatch(alertActions.success({ message: 'You have created a course' }));
		} else {
			dispatch(alertActions.success({ message: 'There was a problem in creating the course' }));
		}
	};
};

const getCourse = (courseId) => {
	const getCourseSuccess = (course) => {
		return { type: courseConstants.GET_COURSEBYID_SUCCESS, course };
	};

	return async (dispatch) => {
		const { data: course, success } = await CourseApi.getCourse(courseId);
		if (success) {
			dispatch(getCourseSuccess(course));
		} else {
			console.error('There was a problem getting the course');
		}
	};
};

const getCoursesByInstructorId = (instructorId) => {
	const getCoursesSuccess = (courses) => {
		return { type: courseConstants.GET_COURSES_SUCCESS, courses };
	};

	return async (dispatch) => {
		const { data: courses, success } = await CourseApi.getCoursesByInstructorId(instructorId);
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
	getCoursesByInstructorId,
};
