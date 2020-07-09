export class CourseCreateRequest {
	constructor({ instructorId, courseName, term, section, capacity }) {
		this.instructorId = instructorId;
		this.courseName = courseName;
		this.term = term;
		this.section = section.toUpperCase();
		this.capacity = parseInt(capacity);
	}
}
