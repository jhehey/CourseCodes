using System;

namespace CourseCodesAPI.Models
{
	public class CourseResponse
	{
		public Guid Id { get; set; }
		public string CourseName { get; set; }
		public string Term { get; set; }
		public string Section { get; set; }
		public int Capacity { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateJoined { get; set; }
		public InstructorResponse Instructor { get; set; }
	}
}
