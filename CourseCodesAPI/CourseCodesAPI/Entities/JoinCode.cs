using System;
namespace CourseCodesAPI.Entities
{
	public class JoinCode
	{
		public Guid Id { get; set; }

		// TODO: Validation Unique Code
		public string Code { get; set; }
		// TODO: Think if need rin join password? maybe para hindi makahula ng join code
		public string PasswordHash { get; set; }
		public DateTime DateExpires { get; set; }

		// A JoinCode has a Course
		public Guid CourseId { get; set; }
		public Course Course { get; set; }
	}
}
