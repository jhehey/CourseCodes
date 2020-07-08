export class SolutionRunRequest {
	constructor({ solutionId, sourceCode, studentId, problemId }) {
		this.solutionId = solutionId;
		this.sourceCode = sourceCode;
		this.studentId = studentId;
		this.problemId = problemId;
	}
}
