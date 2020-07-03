using System;

namespace CourseCodesAPI.Models
{
	public class JoinCourseRequest
	{
		public Guid StudentId { get; set; }
		public string Code { get; set; }
	}
}
