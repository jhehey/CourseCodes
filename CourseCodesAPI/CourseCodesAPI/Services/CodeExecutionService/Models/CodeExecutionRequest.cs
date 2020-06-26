using System.Collections.Generic;

namespace CourseCodesAPI.Services.CodeExecutionService.Models
{
	public class CodeExecutionRequest
	{
		public string SourceCode { get; set; }
		public List<TestCaseRequest> TestCases { get; set; }
	}
}
