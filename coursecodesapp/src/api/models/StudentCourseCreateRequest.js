export class StudentCourseCreateRequest {
	constructor({ studentId, courseId, code }) {
		this.studentId = studentId;
		this.courseId = courseId;
		this.code = code;
	}
}
