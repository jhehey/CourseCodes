using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Services.CodeExecutionService.Models
{
	public class CodeExecutionResult
	{
		public Guid SolutionId { get; set; }
		public List<TestCaseResult> TestCaseResults { get; set; }
		public bool Passed { get; set; }
		public string CompilationError { get; set; }
	}
}
