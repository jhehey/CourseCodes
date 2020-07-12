import { courseConstants } from '../constants';
import { keys, storage } from '../../storage';

const initialState = {
	courseToView: storage.get(keys.CourseToView()) || null,
};

export const course = (state = initialState, action) => {
	switch (action.type) {
		case courseConstants.CREATE_COURSE_SUCCESS:
			return {
				...state,
				courseCreated: action.course,
				closeForm: true,
			};
		case courseConstants.CREATE_COURSE_FAILED:
			return {
				...state,
				closeForm: false,
			};
		case courseConstants.GET_COURSES_SUCCESS:
			return {
				...state,
				courses: action.courses,
			};
		case courseConstants.GET_COURSEBYID_SUCCESS:
			return {
				...state,
				course: action.course,
			};
		case courseConstants.JOIN_COURSE_SUCCESS:
			return {
				...state,
				studentCourse: action.studentCourse,
				joinedCourse: true,
			};
		case courseConstants.JOIN_COURSE_FAILED:
			return {
				...state,
				joinedCourse: false,
			};
		case courseConstants.VIEW_COURSE:
			return {
				...state,
				courseToView: action.courseToView,
			};
		case courseConstants.GET_STUDENTS_BYCOURSEID_SUCCESS:
			return {
				...state,
				students: action.students,
			};
		case courseConstants.ENABLE_FORM_OPEN:
			return {
				...state,
				closeForm: false,
			};
		case courseConstants.ENABLE_JOIN:
			return {
				...state,
				joinedCourse: false,
			};
		default:
			return state;
	}
};
