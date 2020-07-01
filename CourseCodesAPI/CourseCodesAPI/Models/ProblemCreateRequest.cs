using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Models
{
	public class ProblemCreateRequest
	{
		public string Title { get; set; }
		public string Statement { get; set; }

		public Guid AuthorId { get; set; }
		public List<Guid> CourseIds { get; set; } = new List<Guid> ();
		public List<TestCaseCreateRequest> TestCases { get; set; } = new List<TestCaseCreateRequest> ();
	}
}
