using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Entities
{
	// CourseProblem is a join entity for Course and Problem
	public class CourseProblem
	{
		public Guid Id { get; set; }

		// A CourseProblem has a Course
		public Guid CourseId { get; set; }
		public Course Course { get; set; }

		// A CourseProblem has a Problem
		public Guid ProblemId { get; set; }
		public Problem Problem { get; set; }

		public ICollection<Solution> Solutions { get; set; } = new List<Solution> ();
	}
}
