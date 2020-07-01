using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Entities
{
	public class Student
	{
		public Guid Id { get; set; }

		// A Student owns an Account
		public Guid AccountId { get; set; }
		public Account Account { get; set; }

		// A Student has a Collection of StudentCourses (Student has many Courses)
		public ICollection<StudentCourse> StudentCourses { get; set; } = new List<StudentCourse> ();

		// A Student has a Collection of Solutions (Student has many Solutions)
		public ICollection<Solution> Solutions { get; set; } = new List<Solution> ();
	}
}
