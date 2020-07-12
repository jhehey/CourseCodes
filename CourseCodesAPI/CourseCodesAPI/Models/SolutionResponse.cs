using System;

namespace CourseCodesAPI.Models
{
	public class SolutionResponse
	{
		public Guid Id { get; set; }
		public string SourceCode { get; set; }
		public int Status { get; set; }
		public DateTime DateSubmitted { get; set; }
		public StudentResponse Student { get; set; }
		public ProblemResponse Problem { get; set; }
		public CourseResponse Course { get; set; }
	}
}
