using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Entities
{
	public class Instructor
	{
		public Guid Id { get; set; }

		// An Instructor owns an
		public Guid AccountId { get; set; }
		public Account Account { get; set; }

		// An Instructor has a Collection of Courses
		public ICollection<Course> Courses { get; set; }
	}
}
