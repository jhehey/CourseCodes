export class CourseCreateRequest {
	constructor({ instructorId, courseName, term, section, capacity }) {
		this.instructorId = instructorId;
		this.courseName = courseName;
		this.term = term.toUpperCase();
		this.section = section.toUpperCase();
		this.capacity = parseInt(capacity);
	}
}
