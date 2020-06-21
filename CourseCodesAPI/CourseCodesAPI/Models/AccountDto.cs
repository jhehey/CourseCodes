using System;
using CourseCodesAPI.Entities;

namespace CourseCodesAPI.Models
{
	public class AccountDto
	{
		public Guid Id { get; set; }
		public string FullName { get; set; }
		public string Email { get; set; }
		public Role AccountRole { get; set; }
		public DateTime DateRegistered { get; set; }
	}
}
