export class SolutionRunRequest {
	constructor({ solutionId, sourceCode, studentId, courseProblemId }) {
		this.solutionId = solutionId;
		this.sourceCode = sourceCode;
		this.studentId = studentId;
		this.courseProblemId = courseProblemId;
	}
}
