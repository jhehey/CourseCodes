export class CourseCreateRequest {
	constructor({ instructorId, title, description }) {
		this.instructorId = instructorId;
		this.title = title;
		this.description = description;
	}
}
