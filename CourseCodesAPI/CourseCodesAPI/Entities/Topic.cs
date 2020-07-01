using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Entities
{
	public class Topic
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }

		// A Topic belongs to a Course
		public Guid CourseId { get; set; }
		public Course Course { get; set; }

		// A Topic has a Collection of TopicProblems (Topic has many TopicProblems)
		public ICollection<TopicProblem> TopicProblems { get; set; } = new List<TopicProblem> ();
	}
}
