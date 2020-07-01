using System;

namespace CourseCodesAPI.Models
{
	public class CourseCreateRequest
	{
		public Guid InstructorId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
	}
}
