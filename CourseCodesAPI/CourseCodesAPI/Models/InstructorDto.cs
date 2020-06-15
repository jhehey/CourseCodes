using System;

namespace CourseCodesAPI.Models
{
	public class InstructorDto
	{
		public Guid Id { get; set; }
		public string FullName { get; set; }
		public string Email { get; set; }
		public DateTime DateRegistered { get; set; }
	}
}
