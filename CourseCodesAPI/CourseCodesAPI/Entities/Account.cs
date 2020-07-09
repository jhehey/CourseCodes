using System;
using System.Collections.Generic;

namespace CourseCodesAPI.Entities
{
	// Account is an Owned Entity
	public class Account
	{
		public Guid Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string PasswordHash { get; set; }
		public Role AccountRole { get; set; }
		public DateTime DateRegistered { get; set; }

		// An Account can be a Student
		public Student Student { get; set; }

		// An Account can be an Instructor
		public Instructor Instructor { get; set; }

		// An Account can create many Problems
		public ICollection<Problem> Problems { get; set; } = new List<Problem> ();

		public Account ()
		{
			DateRegistered = DateTime.Now;
		}
	}
}
