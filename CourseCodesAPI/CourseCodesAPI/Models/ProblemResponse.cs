using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Models
{
	public class ProblemResponse
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Statement { get; set; }
		public AccountResponse Author { get; set; }
		public List<CourseResponse> Courses { get; set; }
		public List<TestCaseResponse> TestCases { get; set; }
		public int TestCaseCount => TestCases != null ? TestCases.Count : 0;
	}
}
