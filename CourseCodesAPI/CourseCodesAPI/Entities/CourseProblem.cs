using System;

namespace CourseCodesAPI.Entities
{
	// CourseProblem is a join entity for Course and Problem
	public class CourseProblem
	{
		// A CourseProblem has a Course
		public Guid CourseId { get; set; }
		public Course Course { get; set; }

		// A CourseProblem has a Problem
		public Guid ProblemId { get; set; }
		public Problem Problem { get; set; }
	}
}
