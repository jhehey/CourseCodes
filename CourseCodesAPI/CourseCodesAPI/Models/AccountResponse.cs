using System;
using CourseCodesAPI.Entities;

namespace CourseCodesAPI.Models
{
	public class AccountResponse
	{
		public Guid Id { get; set; }
		public string FullName { get; set; }
		public string Email { get; set; }
		public DateTime DateRegistered { get; set; }
		public Role AccountRole { get; set; }
	}
}
