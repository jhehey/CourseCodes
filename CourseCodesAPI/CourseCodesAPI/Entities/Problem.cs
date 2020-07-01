using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Entities
{
	public class Problem
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Statement { get; set; }

		// Problem is authored by an Account
		public Guid AuthorId { get; set; }
		public Account Author { get; set; }

		// A Problem has a Collection of CourseProblems (Problem has many CourseProblems)
		public ICollection<CourseProblem> CourseProblems { get; set; } = new List<CourseProblem> ();

		// A Problem has a Collection of TestCases (Problem has many TestCases)
		public ICollection<TestCase> TestCases { get; set; } = new List<TestCase> ();

		// A Problem has a Collection of Solutions (Problem has many Solutions)
		public ICollection<Solution> Solutions { get; set; } = new List<Solution> ();

		// A Problem has a Collection of TopicProblems (Problem has many TopicProblems)
		public ICollection<TopicProblem> TopicProblems { get; set; } = new List<TopicProblem> ();
	}
}
