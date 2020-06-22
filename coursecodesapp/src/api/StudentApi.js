import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';

const createStudent = async (studentToCreate) => {
	return await Api.call(async () => await axios.post(Routes.Students, studentToCreate));
};

export const StudentApi = {
	createStudent,
};
