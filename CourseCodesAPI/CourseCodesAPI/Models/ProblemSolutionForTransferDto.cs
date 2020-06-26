using System.Collections.Generic;

namespace CourseCodesAPI.Models
{
	public class ProblemSolutionForTransferDto
	{
		public string EncodedSourceCode { get; set; }
		public List<TestCaseDto> TestCases { get; set; }
	}
}
