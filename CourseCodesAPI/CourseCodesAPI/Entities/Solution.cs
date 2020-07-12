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

		// A Solution has a CourseProblem
		public Guid CourseProblemId { get; set; }
		public CourseProblem CourseProblem { get; set; }

		public Solution ()
		{
			DateSubmitted = DateTime.Now;
		}
	}
}
