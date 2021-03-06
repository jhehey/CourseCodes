using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Entities
{
	public class Course
	{
		public Guid Id { get; set; }
		public string CourseName { get; set; }
		public string Term { get; set; }
		public string Section { get; set; }
		public int Capacity { get; set; }
		public DateTime DateCreated { get; set; }

		// A Course has a JoinCode
		public JoinCode JoinCode { get; set; }

		// A Course has an Instructor
		public Guid InstructorId { get; set; }
		public Instructor Instructor { get; set; }

		// A Course has a Collection of StudentCourses (Course has many Students)
		public ICollection<StudentCourse> StudentCourses { get; set; } = new List<StudentCourse> ();

		// A Course has a Collection of CourseProblems (Course has many CourseProblems)
		public ICollection<CourseProblem> CourseProblems { get; set; } = new List<CourseProblem> ();

		// A Course has a Collection of Topics (Course has many Topics)
		public ICollection<Topic> Topics { get; set; } = new List<Topic> ();

		public Course ()
		{
			DateCreated = DateTime.Now;
		}
	}
}
