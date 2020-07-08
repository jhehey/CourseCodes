using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Services.CodeExecutionService.Models
{
	public class CodeExecutionResult
	{
		public Guid SolutionId { get; set; }
		public List<TestCaseResult> TestCaseResults { get; set; }
	}
}
