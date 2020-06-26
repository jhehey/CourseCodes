namespace CourseCodesAPI.Services.CodeExecutionService.Models
{
	public class TestCaseResult
	{
		public string SampleInput { get; set; }
		public string ExpectedOutput { get; set; }
		public string ActualOutput { get; set; }
		public TestCaseStatus Status { get; set; } = TestCaseStatus.Undefined;
		public string ErrorMessage { get; set; }
	}

}
