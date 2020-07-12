import { courseConstants } from '../constants';
import { alertActions } from './alert.actions';
import { CoursesApi, StudentsApi } from '../../api';
import { keys, storage } from '../../storage';

const createCourse = (courseToCreate) => {
	const createCourseSuccess = (course) => {
		return { type: courseConstants.CREATE_COURSE_SUCCESS, course };
	};
	const createCourseFailed = () => {
		return { type: courseConstants.CREATE_COURSE_FAILED };
	};

	return async (dispatch) => {
		const { data: course, success, error } = await CoursesApi.createCourse(courseToCreate);
		if (success) {
			dispatch(createCourseSuccess(course));
			dispatch(alertActions.success({ message: 'You have created a course' }));
		} else {
			const message =
				(error && error.CourseName && error.CourseName[0]) || 'There was an error in processing your request';
			dispatch(alertActions.error({ message }));
			dispatch(createCourseFailed());
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
		}
	};
};

const joinCourse = (joinCourseDetails) => {
	const joinCourseSuccess = (studentCourse) => {
		return { type: courseConstants.JOIN_COURSE_SUCCESS, studentCourse };
	};
	const joinCourseFailed = (studentCourse) => {
		return { type: courseConstants.JOIN_COURSE_FAILED };
	};

	return async (dispatch) => {
		const { data: studentCourse, success, error } = await CoursesApi.joinCourse(joinCourseDetails);
		if (success) {
			dispatch(joinCourseSuccess(studentCourse));
			dispatch(alertActions.success({ message: 'You have joined the course' }));
		} else {
			const message =
				(error?.message && error?.message[0]) || 'There was a problem in processing your request. Try again';
			dispatch(alertActions.error({ message }));
			dispatch(joinCourseFailed());
		}
	};
};

const viewCourse = (courseToView) => {
	return async (dispatch) => {
		storage.set(keys.CourseToView(), courseToView);
		dispatch({ type: courseConstants.VIEW_COURSE, courseToView });
	};
};

const getStudentsByCourseId = (courseId) => {
	return async (dispatch) => {
		const { data: students, success } = await StudentsApi.getStudents({ courseId });
		if (success) {
			dispatch({ type: courseConstants.GET_STUDENTS_BYCOURSEID_SUCCESS, students });
		}
	};
};

const enableFormOpen = () => {
	return async (dispatch) => {
		return dispatch({ type: courseConstants.ENABLE_FORM_OPEN });
	};
};

const enableJoin = () => {
	return async (dispatch) => {
		return dispatch({ type: courseConstants.ENABLE_JOIN });
	};
};

export const courseActions = {
	createCourse,
	getCourse,
	getCourses,
	joinCourse,
	viewCourse,
	getStudentsByCourseId,
	enableFormOpen,
	enableJoin,
};
