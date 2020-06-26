using System.Collections.Generic;

namespace CourseCodesAPI.Models
{
	public class ProblemSolutionForExecutionDto
	{
		public string SourceCode { get; set; }
		public List<string> InputList { get; set; }
	}
}
