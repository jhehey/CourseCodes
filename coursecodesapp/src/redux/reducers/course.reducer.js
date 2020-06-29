import { courseConstants } from '../constants';
// import { keys, storage } from '../../storage';

export const course = (state = null, action) => {
	switch (action.type) {
		case courseConstants.CREATE_COURSE_SUCCESS:
			return {
				courseCreated: action.course,
			};
		case courseConstants.GET_COURSES_SUCCESS:
			return {
				courses: action.courses,
			};
		case courseConstants.GET_COURSEBYID_SUCCESS:
			return {
				course: action.course,
			};
		default:
			return state;
	}
};
