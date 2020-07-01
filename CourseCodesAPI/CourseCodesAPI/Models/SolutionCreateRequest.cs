using System;

namespace CourseCodesAPI.Models
{
	public class SolutionCreateRequest
	{
		public string SourceCode { get; set; }
		public Guid StudentId { get; set; }
		public Guid ProblemId { get; set; }
	}
}
