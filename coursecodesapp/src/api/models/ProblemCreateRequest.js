export class ProblemCreateRequest {
	constructor({ title, statement, authorId, courseIds, testCases }) {
		this.title = title;
		this.statement = statement;
		this.authorId = authorId;
		this.courseIds = courseIds;
		this.testCases = testCases;
	}
}
