import axios from 'axios';
import Routes from './Routes';
import ApiCaller from './ApiCaller';

export default class InstructorsApi extends ApiCaller {
	static async createInstructor(instructorToCreate) {
		return await this.call(async () => await axios.post(Routes.Instructors, instructorToCreate));
	}
}
