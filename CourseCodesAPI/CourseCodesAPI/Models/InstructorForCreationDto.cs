using CourseCodesAPI.Entities;

namespace CourseCodesAPI.Models
{
	public class InstructorForCreationDto
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string PasswordHash { get; set; }
		public Role AccountRole { get; set; }
	}
}
