using System;

namespace CourseCodesAPI.Entities
{
	public class TestCase
	{
		public Guid Id { get; set; }
		public string SampleInput { get; set; }
		public string ExpectedOutput { get; set; }

		// TestCase has a problem
		public Guid ProblemId { get; set; }
		public Problem Problem { get; set; }
	}
}
