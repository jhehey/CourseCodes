using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Entities
{
	public class Student
	{
		public Guid Id { get; set; }

		// A Student owns an Account
		public Account Account { get; set; }

		// A Student has a Collection of StudentCourses (Student has many Courses)
		public ICollection<StudentCourse> StudentCourses { get; set; }
	}
}
