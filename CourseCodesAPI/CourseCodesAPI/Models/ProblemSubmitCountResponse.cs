using System;

namespace CourseCodesAPI.Models
{
	public class ProblemSubmitCountResponse
	{
		public Guid ProblemId { get; set; }
		public int SubmitCount { get; set; }
		public int StudentCount { get; set; }
	}
}
