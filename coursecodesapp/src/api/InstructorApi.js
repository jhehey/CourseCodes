import axios from 'axios';
import Routes from './Routes';
import { Api } from './Api';

const createInstructor = async (instructorToCreate) => {
	return await Api.call(async () => await axios.post(Routes.Instructors, instructorToCreate));
};

const getInstructorByAccountId = async (accountId) => {
	return await Api.call(async () => await axios.get(`${Routes.Instructors}?accountId=${accountId}`));
};

export const InstructorApi = {
	createInstructor,
	getInstructorByAccountId,
};
