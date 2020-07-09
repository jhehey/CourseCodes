using System;

namespace CourseCodesAPI.Models
{
	public class CourseCreateRequest
	{
		public Guid InstructorId { get; set; }
		public string CourseName { get; set; }
		public string Term { get; set; }
		public string Section { get; set; }
		public int Capacity { get; set; }
	}
}
