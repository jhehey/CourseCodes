using System;

namespace CourseCodesAPI.Models
{
	public class StudentCourseCreateRequest
	{
		public Guid StudentId { get; set; }
		public Guid CourseId { get; set; }
		public string Code { get; set; }
	}
}
