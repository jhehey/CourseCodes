export class TopicCreateRequest {
	constructor({ title, description, problemIds }) {
		this.title = title;
		this.description = description;
		this.problemIds = problemIds;
	}
}
