using System;

namespace CourseCodesAPI.Models
{
	public class SolutionRunRequest
	{
		public string SourceCode { get; set; }
		public Guid StudentId { get; set; }
		public Guid ProblemId { get; set; }
	}
}
