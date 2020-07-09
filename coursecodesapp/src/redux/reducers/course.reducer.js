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
				studentCourse: action.studentCourse,
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
		default:
			return state;
	}
};
