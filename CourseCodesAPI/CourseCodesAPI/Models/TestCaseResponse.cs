using System;

namespace CourseCodesAPI.Models
{
	public class TestCaseResponse
	{
		public Guid Id { get; set; }
		public string SampleInput { get; set; }
		public string ExpectedOutput { get; set; }
	}
}
