using System;

namespace CourseCodesAPI.Entities
{
	// StudentCourse is a join entity for Student and Course
	public class StudentCourse
	{
		// A StudentCourse has a Student
		public Guid StudentId { get; set; }
		public Student Student { get; set; }

		// A StudentCourse has a Course
		public Guid CourseId { get; set; }
		public Course Course { get; set; }

		// Date when the Student joined the Course
		public DateTime DateJoined { get; set; }

		public StudentCourse ()
		{
			DateJoined = DateTime.UtcNow;
		}
	}
}
