using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Services.CodeExecutionService.Models
{
	public class CodeExecutionRequest
	{
		public Guid SolutionId { get; set; }
		public string SourceCode { get; set; }
		public List<TestCaseRequest> TestCases { get; set; }
	}
}
