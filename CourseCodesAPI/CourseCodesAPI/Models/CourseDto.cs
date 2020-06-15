using System;

namespace CourseCodesAPI.Models
{
	public class CourseDto
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public DateTime DateCreated { get; set; }
		public InstructorDto Instructor { get; set; }
	}
}
