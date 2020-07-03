using System;

namespace CourseCodesAPI.Models
{
	public class JoinCourseResponse
	{
		public StudentResponse Student { get; set; }
		public CourseResponse Course { get; set; }
		public DateTime DateJoined { get; set; }
	}
}
