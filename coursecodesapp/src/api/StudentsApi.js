import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';

const getStudents = async (query = {}) => {
	return await Api.call(async () => await axios.get(Routes.Students({ query })));
};

export const StudentsApi = {
	getStudents,
};
