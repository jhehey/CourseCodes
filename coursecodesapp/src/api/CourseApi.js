import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';

const createCourse = async (courseToCreate) => {
	return await Api.call(async () => await axios.post(Routes.Courses, courseToCreate));
};

const getCourse = async (courseId) => {
	return await Api.call(async () => await axios.get(`${Routes.Courses}/${courseId}`));
};

const getCoursesByInstructorId = async (instructorId) => {
	return await Api.call(async () => await axios.get(`${Routes.Courses}?instructorId=${instructorId}`));
};

export const CourseApi = {
	createCourse,
	getCourse,
	getCoursesByInstructorId,
};
