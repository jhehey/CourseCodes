using System;

namespace CourseCodesAPI.Entities
{
	// Account is an Owned Entity
	public class Account
	{
		public Guid Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public DateTime DateRegistered { get; set; }
	}
}
