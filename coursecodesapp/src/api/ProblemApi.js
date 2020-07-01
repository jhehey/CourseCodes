import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';

const createProblem = async (problemToCreate) => {
	return await Api.call(async () => await axios.post(Routes.Problems, problemToCreate));
};

export const ProblemApi = {
	createProblem,
};
