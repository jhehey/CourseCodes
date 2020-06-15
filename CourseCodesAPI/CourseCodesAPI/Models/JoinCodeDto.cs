using System;
namespace CourseCodesAPI.Models
{
	public class JoinCodeDto
	{
		public Guid Id { get; set; }
		public string Code { get; set; }
		public DateTime DateExpires { get; set; }
	}
}
