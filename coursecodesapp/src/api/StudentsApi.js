import axios from 'axios';
import Routes from './Routes';
import ApiCaller from './ApiCaller';

export default class StudentsApi extends ApiCaller {
	static async createStudent(studentToCreate) {
		return await this.call(async () => await axios.post(Routes.Students, studentToCreate));
	}
}

// //TODO
// export const getAll = async () => {
// 	const result = { data: null, status: null, error: null };
// 	try {
// 		const { data } = await axios.get(Routes.Students);
// 		result.data = data;
// 	} catch (error) {
// 		result.error = error;
// 	}
// 	return result;
// };

// //TODO
// export const getById = async (studentId) => {
// 	const result = { data: null, status: null, error: null };
// 	try {
// 		const { data } = await axios.get(`${Routes.Students}/${studentId}`);
// 		result.data = data;
// 	} catch (error) {
// 		result.error = error;
// 	}
// 	return result;
// };

// export const createStudent = async (studentToCreate) => {
// 	let result = { data: null, status: null, error: null };
// 	try {
// 		const { data, status } = await axios.post(Routes.Students, studentToCreate);
// 		result = { ...result, data, status };
// 	} catch (error) {
// 		result.error = error;
// 	}
// 	return result;
// };
