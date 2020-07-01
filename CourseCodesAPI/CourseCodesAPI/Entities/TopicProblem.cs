using System;

namespace CourseCodesAPI.Entities
{
	// TopicProblem is a join entity for Topic and Problem
	public class TopicProblem
	{
		// A TopicProblem has a Topic
		public Guid TopicId { get; set; }
		public Topic Topic { get; set; }

		// A TopicProblem has a Problem
		public Guid ProblemId { get; set; }
		public Problem Problem { get; set; }
	}
}
