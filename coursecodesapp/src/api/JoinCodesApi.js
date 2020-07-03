import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';

const getJoinCode = async (courseId) => {
	return await Api.call(async () => await axios.get(Routes.JoinCodes(courseId)));
};

const generateJoinCode = async (courseId) => {
	return await Api.call(async () => await axios.post(Routes.JoinCodes(courseId, { generate: true })));
};

export const JoinCodesApi = {
	getJoinCode,
	generateJoinCode,
};
