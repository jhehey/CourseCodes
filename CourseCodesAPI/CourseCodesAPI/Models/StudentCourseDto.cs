using System;

namespace CourseCodesAPI.Models
{
	public class StudentCourseDto
	{
		public StudentDto Student { get; set; }
		public CourseDto Course { get; set; }
		public DateTime DateJoined { get; set; }
	}
}
