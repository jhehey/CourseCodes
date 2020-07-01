using System;

namespace CourseCodesAPI.Entities
{
	public class Solution
	{
		public Guid Id { get; set; }
		public string SourceCode { get; set; }
		public int Status { get; set; }
		public DateTime DateSubmitted { get; set; }

		// A Solution has a Student
		public Guid StudentId { get; set; }
		public Student Student { get; set; }

		// A Solution has a Problem
		public Guid ProblemId { get; set; }
		public Problem Problem { get; set; }

		public Solution ()
		{
			DateSubmitted = DateTime.UtcNow;
		}
	}
}
