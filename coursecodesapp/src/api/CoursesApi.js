import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';
import * as Models from './models';

const createCourse = async (courseDetails) => {
	const courseToCreate = new Models.CourseCreateRequest(courseDetails);
	return await Api.call(async () => await axios.post(Routes.Courses(), courseToCreate));
};
const getCourse = async (courseId) => {
	return await Api.call(async () => await axios.get(Routes.Courses({ courseId })));
};
const getCourses = async (query = {}) => {
	console.log(`GET COURSES: ${Routes.Courses({ query })}`);
	return await Api.call(async () => await axios.get(Routes.Courses({ query })));
};
const joinCourse = async (joinCourseDetails) => {
	return await Api.call(async () => await axios.post(Routes.Courses({ join: true }), joinCourseDetails));
};

export const CoursesApi = {
	createCourse,
	getCourse,
	getCourses,
	joinCourse,
};
