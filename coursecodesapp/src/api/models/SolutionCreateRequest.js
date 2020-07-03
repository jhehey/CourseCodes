export class SolutionCreateRequest {
	constructor({ sourceCode, studentId, problemId }) {
		this.sourceCode = sourceCode;
		this.studentId = studentId;
		this.problemId = problemId;
	}
}
