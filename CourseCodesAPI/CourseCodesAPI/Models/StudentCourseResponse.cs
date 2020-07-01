using System;

namespace CourseCodesAPI.Models
{
	public class StudentCourseResponse
	{
		public StudentResponse Student { get; set; }
		public CourseResponse Course { get; set; }
		public DateTime DateJoined { get; set; }
	}
}
